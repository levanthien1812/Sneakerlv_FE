import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { json, useLoaderData } from "react-router";
import { currencyFormatter } from "../../../utils/formatters";
import CartItem from "../components/CartItem";
import { actions as cartActions } from "../../../store/cart";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const _cartItems = useLoaderData();
  useEffect(() => {
    dispatch(cartActions.setCartItems(_cartItems));
  }, []);
  const cartItems = useSelector((state) => state.cart.cartItems);

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
            {currencyFormatter.format(1000000)}
          </Typography>
          <Typography fontSize={20} color="#444">
            70% off
          </Typography>
          <Button variant="contained">Checkout</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const cartLoader = async () => {
  const resonse = await fetch("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: "include",
  });

  if (!resonse.ok) {
    throw json({ message: "Error when loading cart items!" }, { status: 500 });
  }

  const { data } = await resonse.json();
  return data;
};
