import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { _fetchAddresses } from "../../../store/account";
import Address from "../../Account/Components/Address";
import ChooseAddress from "../../Account/Components/ChooseAddress";
import { actions as accountActions } from "../../../store/account";
import AddAddress from "../../Account/Components/AddAddress";
import PaymentMethodInfo from "../components/PaymentMethodInfo";
import ReceiptInfo from "../components/ReceiptInfo";
import { placeOrder } from "../../../services";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const addresses = useSelector((state) => state.account.addresses);
  const [chosenAddress, setChosenAddress] = useState();
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentChosen, setPaymentChosen] = useState("transfer");
  const [isOrdering, setIsOrdering] = useState(false);
  const totalPrice = cartItems.reduce((prev, curr) => prev + curr.price, 0);

  const chosenCartItems = cartItems.filter(
    (cartItem) => cartItem.isChosen === true
  );

  const { isChangingAddress, isAddingAddress } = useSelector(
    (state) => state.account
  );

  useEffect(() => {
    dispatch(accountActions.setIsCheckingOut(true));
    dispatch(_fetchAddresses());

    const defaultAddress = addresses.find(
      (address) => address.isDefault === true
    );
    setChosenAddress(defaultAddress);
  }, []);

  const placeOrderHandler = async (totalPrice) => {
    setIsOrdering(true);
    setTimeout(async () => {
      const data = await placeOrder(
        chosenCartItems,
        chosenAddress,
        paymentChosen,
        totalPrice,
        shippingFee
      );
      setIsOrdering(false);
      if (data.data) {
        navigate("/order-success", { state: { paymentMethod: paymentChosen } });
      }
    }, 1000);
  };

  return (
    <Container>
      <Typography marginTop={3} variant="h4">
        Checkout
      </Typography>
      <Stack marginTop={2} direction="row" spacing={3}>
        <Stack>
          <Stack
            style={{
              borderLeft: "2px solid orange",
              backgroundColor: "#f1edd955",
            }}
            padding={2}
          >
            <Typography variant="h6">Shipping Address</Typography>
            {chosenAddress && <Address address={chosenAddress} />}
          </Stack>
          <PaymentMethodInfo
            paymentChosen={paymentChosen}
            setPaymentChosen={setPaymentChosen}
            totalPrice={totalPrice}
          />
        </Stack>
        <ReceiptInfo
          chosenCartItems={chosenCartItems}
          onPlaceOrder={placeOrderHandler}
          shippingFee={shippingFee}
          isOrdering={isOrdering}
        />
      </Stack>
      {isChangingAddress && (
        <ChooseAddress setChosenAddress={setChosenAddress} />
      )}
      {isAddingAddress && (
        <AddAddress
          onClose={() => {
            dispatch(accountActions.setIsAddingAddress(false));
            dispatch(accountActions.setIsChangingAddress(true));
          }}
        />
      )}
    </Container>
  );
}

export default Checkout;
