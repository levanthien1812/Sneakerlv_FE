import React from 'react'
import classes from './AuthBtns.module.css'

function AuthBtns() {
    return (
      <div className={classes['auth-btns']}>
        <div
          className={`${classes["btn-container"]} ${classes["login-container"]}`}
        >
          <button className={`${classes.btn} ${classes["login-btn"]}`}>
            Đăng nhập
          </button>
        </div>
        <div
          className={`${classes["btn-container"]} ${classes["signup-container"]}`}
        >
          <button className={`${classes.btn} ${classes["signup-btn"]}`}>
            Đăng ký
          </button>
        </div>
      </div>
    );
}

export default AuthBtns