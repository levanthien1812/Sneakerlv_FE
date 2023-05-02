import React, { useState } from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { IconButton, Badge } from "@mui/material";
import CartPopup from "../../pages/Cart/components/CartPopup";
import { useDispatch, useSelector } from "react-redux";
import { actions as cartActions } from "../../store/cart";
import { actions as accountActions } from "../../store/account";
import AccountPopup from "../../pages/Account/Components/AccountPopup";

function UserCartBtns() {
  const dispatch = useDispatch();
  const { isCartPopupShow, quantity } = useSelector((state) => state.cart);
  const { isAccountPopupShow } = useSelector((state) => state.account);

  const showCartPopupHandler = (event) => {
    isCartPopupShow
      ? dispatch(cartActions.hideCartPopup())
      : dispatch(cartActions.showCartPopup());
  };

  const showAccountPopupHandler = (event) => {
    isAccountPopupShow
      ? dispatch(accountActions.hideAccountPopup())
      : dispatch(accountActions.showAccountPopup());
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="cart" onClick={showCartPopupHandler}>
        <Badge badgeContent={quantity} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </IconButton>
      {isCartPopupShow && <CartPopup />}
      <IconButton aria-label="delete" onClick={showAccountPopupHandler}>
        <AccountCircle fontSize="large" />
      </IconButton>
      {isAccountPopupShow && <AccountPopup/>}
    </Stack>
  );
}

export default UserCartBtns;
