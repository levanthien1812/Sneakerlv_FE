import React from "react";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { IconButton, Badge, Popover, Typography } from "@mui/material";
import CartPopup from "../../pages/Cart/components/CartPopup";

function UserCartBtns() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const showCartPopupHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="cart" onClick={showCartPopupHandler}>
        <Badge badgeContent={4} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <CartPopup/>
      </Popover>
      <IconButton aria-label="delete">
        <AccountCircle fontSize="large" />
      </IconButton>
    </Stack>
  );
}

export default UserCartBtns;
