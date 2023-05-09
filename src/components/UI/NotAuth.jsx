import { Button, Stack, Typography } from "@mui/material";
import React from "react";

function NotAuth() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography>
        You are not logged in! Please <Button variant="text"> log in</Button> or
        <Button variant="text"> sign up</Button>.
      </Typography>
    </Stack>
  );
}

export default NotAuth;
