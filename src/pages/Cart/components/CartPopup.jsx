import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as cartActions } from "../../../store/cart";

function CartPopup() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const remainingQuantity = cartItems.length - 3;

  return (
    <Box
      position="absolute"
      top={60}
      right={0}
      padding={0}
      bgcolor="white"
      zIndex={10}
      boxShadow={1}
    >
      <Stack p={2} spacing={1}>
        {cartItems.slice(0, 3).map((item) => (
          <CartItemCard key={item._id} item={item} />
        ))}
        {remainingQuantity > 0 && (
          <Typography variant="p">and 2 mores</Typography>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(cartActions.hideCartPopup());
          }}
        >
          <Link to="/cart" style={{ color: "white" }}>
            Go to cart
          </Link>
        </Button>
      </Stack>
    </Box>
  );
}

export default CartPopup;
