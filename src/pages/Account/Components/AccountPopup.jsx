import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../utils/auth";
import { actions as authActions } from "../../../store/auth";
import { useDispatch } from "react-redux";

function AccountPopup() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    logout()
    dispatch(authActions.setAuthen())
  }

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
        <Box textAlign="center" paddingY={1} paddingX={3}>
          <Link to="/account/profile">My account</Link>
        </Box>
        <Box textAlign="center" paddingY={1} paddingX={3}>
          <Link to="/my-orders">My order</Link>
        </Box>
        <Box paddingX={3}>
          <Button sx={{ width: "100%" }} onClick={logoutHandler}>Log out</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default AccountPopup;
