import React from "react";
import Modal from "../../../components/UI/Modal";
import { Stack, TextField, Typography } from "@mui/material";

function ConfirmEmail() {
  return (
    <Modal>
      <Stack>
        <Typography variant="p" textAlign="center">
          Please enter the code we have sent to your email address
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          style={{ textAlign: "center" }}
        ></TextField>
      </Stack>
    </Modal>
  );
}

export default ConfirmEmail;
