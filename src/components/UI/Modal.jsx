import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

function Modal(props) {
  return (
    <>
      {createPortal(<Backdrop onClick />, document.getElementById('backdrop'))}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('modal'))}
    </>
  );
}

export default Modal;
