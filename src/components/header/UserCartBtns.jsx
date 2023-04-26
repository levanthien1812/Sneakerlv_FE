import React, { useState } from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { IconButton, Badge } from "@mui/material";
import CartPopup from "../../pages/Cart/components/CartPopup";
import { useDispatch, useSelector } from "react-redux";
import { actions as cartActions } from "../../store/cart";

function UserCartBtns() {
  const dispatch = useDispatch();
  const { isCartPopupShow, quantity } = useSelector((state) => state.cart);

  const showCartPopupHandler = (event) => {
    isCartPopupShow
      ? dispatch(cartActions.hideCartPopup())
      : dispatch(cartActions.showCartPopup());
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="cart" onClick={showCartPopupHandler}>
        <Badge badgeContent={quantity} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </IconButton>
      {isCartPopupShow && <CartPopup />}
      <IconButton aria-label="delete">
        <AccountCircle fontSize="large" />
      </IconButton>
    </Stack>
  );
}

export default UserCartBtns;
