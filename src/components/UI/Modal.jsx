import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { actions as UIActions } from "../../store/ui";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  const width = props.width || "fit-content";
  return (
    <div className={classes.modal} style={{ width }}>
      {props.children}
    </div>
  );
};

function Modal(props) {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(UIActions.hideModal());
    props.onCloseModal();
  };

  return (
    <>
      {createPortal(
        <Backdrop onClick={hideModalHandler} />,
        document.getElementById("backdrop")
      )}
      {createPortal(
        <ModalOverlay width={props.width}>{props.children}</ModalOverlay>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Modal;
