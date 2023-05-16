import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MyDialog({
  title = "Message",
  message,
  closeText = "Cancel",
  acceptText = "OK",
  onClose,
  onAccept,
}) {
  const acceptHandler = () => {
    onClose();
    onAccept();
  };
  return (
    <Dialog
      open={true}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          {closeText}
        </Button>
        <Button onClick={acceptHandler} autoFocus>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyDialog;
