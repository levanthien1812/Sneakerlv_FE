import React, { useState } from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { IconButton, Badge } from "@mui/material";
import CartPopup from "../../pages/Cart/components/CartPopup";

function UserCartBtns() {
  const [cartShown, setCartShow] = useState(false);
  const showCartPopupHandler = (event) => {
    setCartShow(!cartShown);
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="cart" onClick={showCartPopupHandler}>
        <Badge badgeContent={4} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </IconButton>
      {cartShown && (
        <CartPopup onGoToCartClick={showCartPopupHandler}/>
      )}
      <IconButton aria-label="delete">
        <AccountCircle fontSize="large" />
      </IconButton>
    </Stack>
  );
}

export default UserCartBtns;
