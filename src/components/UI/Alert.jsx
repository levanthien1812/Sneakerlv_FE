import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import classes from "./Alert.module.css";
import { createPortal } from "react-dom";

function MyAlert({ notif }) {
  return createPortal(
    <Alert
      severity={!notif.type ? "true" : notif.type}
      className={classes.alert}
    >
      <AlertTitle>{notif.title}</AlertTitle>
      {notif.message}
    </Alert>,
    document.getElementById("alert")
  );
}

export default MyAlert;
