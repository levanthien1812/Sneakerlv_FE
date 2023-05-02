import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { getUser } from "../../../utils/auth";
import { Link, Outlet } from "react-router-dom";
import { AccountCircle, Logout, ShoppingBasket } from "@mui/icons-material";

function AccountRoot() {
  const user = getUser();
  return (
    <Stack
          direction="row"
          paddingX={16}
          paddingY={2}
          spacing={4}
      sx={{
        backgroundColor: "#eee",
      }}
    >
      <Stack>
        <Stack direction="row" padding={2} spacing={2}>
          <Box width={60} height={60} borderRadius="50%" overflow="hidden">
            <img width="100%" height="100%" src={user.photo}></img>
          </Box>
          <Stack justifyContent="center">
            <Typography fontSize={18}>{user.name}</Typography>
            <Typography textTransform="capitalize">{user.role}</Typography>
          </Stack>
        </Stack>
        <Stack padding={2} spacing={2}>
          <Link to="/account/profile">
            <AccountCircle
              sx={{
                marginRight: "8px",
              }}
            />
            <span>Account</span>
          </Link>
          <Link to="/account/profile">Profile</Link>
          <Link to="/account/addresses">Pickup Addresses</Link>
          <Link to="/account/payment-methods">Payment methods</Link>
          <Link to="/account/change-password">Change Password</Link>
          <Link to="/account/orders">
            <ShoppingBasket
              sx={{
                marginRight: "8px",
              }}
            />
            Orders
          </Link>
          <Link to="/account/logout">
            <Logout
              sx={{
                marginRight: "8px",
              }}
            />
            Logout
          </Link>
        </Stack>
      </Stack>
      <Outlet />
    </Stack>
  );
}

export default AccountRoot;
