import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { json, useLoaderData } from "react-router";
import { currencyFormatter } from "../../../utils/formatters";
import CartItem from "../components/CartItem";
import { actions as cartActions } from "../../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../utils/cart";

export default function Cart() {
  let cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

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
          <Button variant="contained">Checkout</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
