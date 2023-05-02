import { Stack, Typography } from "@mui/material";
import React from "react";

function Account() {
  return (
    <Stack
      flexGrow={1}
      borderRadius={5}
      padding={3}
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h2" fontSize={24}>
        My profile
          </Typography>
          <Stack direction="row">
              
          </Stack>
    </Stack>
  );
}

export default Account;
