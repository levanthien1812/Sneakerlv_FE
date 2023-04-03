import React from 'react'
import classes from './AuthBtns.module.css'
import { Link } from 'react-router-dom';

function AuthBtns() {
    return (
      <div className={classes['auth-btns']}>
        <div
          className={`${classes["btn-container"]} ${classes["login-container"]}`}
        >
          <button className={`${classes.btn} ${classes["login-btn"]}`}>
            <Link to="login">Login</Link>
          </button>
        </div>
        <div
          className={`${classes["btn-container"]} ${classes["signup-container"]}`}
        >
          <button className={`${classes.btn} ${classes["signup-btn"]}`}>
            <Link to="signup">Signup</Link>
          </button>
        </div>
      </div>
    );
}

export default AuthBtns