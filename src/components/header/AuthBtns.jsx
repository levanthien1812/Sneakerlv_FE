import React from "react";
import classes from "./AuthBtns.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../store/auth";
import { actions as UIActions } from "../../store/ui";
import LoginModal from "../../pages/Auth/screens/Login";

function AuthBtns() {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(state => state.auth.isLoggingIn)

  const showLoginHandler = () => {
    dispatch(authActions.setIsLoggingIn(true));
  };

  return (
    <div className={classes["auth-btns"]}>
      <div
        className={`${classes["btn-container"]} ${classes["login-container"]}`}
      >
        <button
          className={`${classes.btn} ${classes["login-btn"]}`}
          onClick={showLoginHandler}
        >
          Login
        </button>
      </div>
      {isLoggingIn && <LoginModal/>}
      
      <div
        className={`${classes["btn-container"]} ${classes["signup-container"]}`}
      >
        <button className={`${classes.btn} ${classes["signup-btn"]}`}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default AuthBtns;
