import {
  Alert,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { currencyFormatter } from "../../../utils/formatters";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../store/cart";
import { useNavigate } from "react-router";
import { actions as UIActions } from "../../../store/ui";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const checkoutHandler = () => {
    const chosenCartItems = cartItems
      .filter((cartItem) => cartItem.isChosen === true)
      .map((cartItems) => cartItems._id);
    if (!chosenCartItems || chosenCartItems.length === 0) {
      setWarning("Please choose at least one cart item to check out!");
    } else {
      setWarning(null);
      navigate("/checkout", { state: { chosenCartItems } });
    }
  };

  return (
    <Container>
      <Typography variant="h1" fontSize={30} marginTop={6}>
        Shopping Cart
      </Typography>
      <Typography variant="p" marginTop={2}>
        {cartItems.length + " items in your cart"}
      </Typography>
      {warning !== null && (
        <Alert
          color="warning"
          onClose={() => {
            setWarning(null);
          }}
          style={{
            marginTop: "16px"
          }}
        >
          {warning}
        </Alert>
      )}
      <Stack direction="row" spacing={8} marginTop={4}>
        <Stack spacing={1} marginTop={2}>
          {cartItems.map((item) => (
            <Fragment key={item._id}>
              <CartItem item={item} />
              <Divider />
            </Fragment>
          ))}
        </Stack>
        <Stack minWidth="25%">
          <Typography>Total</Typography>
          <Typography variant="p" fontSize={32} fontWeight={600}>
            {currencyFormatter.format(totalPrice)}
          </Typography>
          <Typography fontSize={20} color="#444">
            70% off
          </Typography>
          <Button variant="contained" onClick={checkoutHandler}>
            Checkout
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
