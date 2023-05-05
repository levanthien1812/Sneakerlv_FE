import React, { useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Button, Stack, TextField, Typography } from "@mui/material";

function ChangeEmailPopup({ onConfirmEmailHandler }) {
  const [newEmail, setNewEmail] = useState();
  const confirmClickHandler = () => {
    onConfirmEmailHandler(newEmail);
  };

  const changeEmailHandler = (event) => {
    setNewEmail(event.target.value);
  };

  return (
    <Modal>
      <Typography fontSize={20} mb={2}>
        Đăng ký
      </Typography>
      <Stack>
        <Typography>Enter your new email address</Typography>
        <TextField
          size="small"
          placeholder="somebody@gmail.com"
          variant="outline"
          onChange={changeEmailHandler}
        />
      </Stack>
      <Button onClick={confirmClickHandler}>Confirm</Button>
    </Modal>
  );
}

export default ChangeEmailPopup;
