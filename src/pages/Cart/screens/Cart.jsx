import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { currencyFormatter } from "../../../utils/formatters";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../store/cart";
import { useNavigate } from "react-router";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const checkoutHandler = () => {
    const chosenCartItems = cartItems
      .filter((cartItem) => cartItem.isChosen === true)
      .map((cartItems) => cartItems._id);
    navigate("/checkout", { state: { chosenCartItems } });
  };

  return (
    <Stack padding={4}>
      <Typography variant="h1" fontSize={30}>
        Shopping Cart
      </Typography>
      <Typography variant="p">
        {cartItems.length + " items in your cart"}
      </Typography>
      <Stack direction="row" spacing={8}>
        <Stack spacing={1} marginTop={2}>
          {cartItems.map((item) => (
            <Fragment key={item._id}>
              <CartItem item={item} />
              <Divider />
            </Fragment>
          ))}
        </Stack>
        <Stack>
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
    </Stack>
  );
}
