import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "../../../components/UI/Modal";
import { actions as authActions } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginGoogle } from "../../../utils/loginGoogle";
import { actions as UIActions } from "../../../store/ui";
import MyAlert from "../../../components/UI/Alert";
import ConfirmEmail from "../components/ConfirmEmail";
import { setToken } from "../../../utils/auth";

function SignupModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  // const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);
  const isNotifShown = useSelector((state) => state.ui.isNotifShown);

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/sign-up", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          passwordConfirm,
          phoneNum,
          photo: "http://localhost:3000/images/users/default-user.jpg",
        }),
      });

      const data = await response.json();

      if (data.status === "fail") {
        dispatch(
          UIActions.showNotification({
            title: "Error!",
            type: "error",
            message: data.message,
          })
        );
        setEmail("");
        setPassword("");
      } else {
        dispatch(authActions.setIsSigningUp(false));
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        dispatch(authActions.setAuthen());
        dispatch(
          UIActions.showNotification({
            title: "Notification",
            type: "success",
            message:
              "Sign up successfully!",
          })
        );
        setTimeout(() => {
          dispatch(UIActions.hideNotification());
          // setIsConfirmingEmail(true);
        }, 2000);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function changeEmailHandler(event) {
    setEmail(event.target.value);
  }
  function changeNameHandler(event) {
    setName(event.target.value);
  }
  function changePasswordHandler(event) {
    setPassword(event.target.value);
  }
  function changePasswordConfirmHandler(event) {
    setPasswordConfirm(event.target.value);
  }
  function changePhoneNumHandler(event) {
    setPhoneNum(event.target.value);
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const convertToLoginHandler = () => {
    dispatch(authActions.signup());
  };

  return (
    <>
      {isNotifShown && <MyAlert />}
      {/* {isConfirmingEmail && <ConfirmEmail />} */}
      <Modal
        onCloseModal={dispatch.bind(this, authActions.setIsSigningUp(false))}
      >
        <Typography fontSize={20} mb={2}>
          Đăng ký
        </Typography>
        <form>
          <FormControl sx={{ mb: 2, display: "block" }}>
            <TextField
              id="email"
              variant="outlined"
              label="Email"
              onChange={changeEmailHandler}
              value={email}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, display: "block" }}>
            <TextField
              id="name"
              variant="outlined"
              label="Name"
              onChange={changeNameHandler}
              value={name}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, display: "block" }}>
            <TextField
              id="phoneNum"
              variant="outlined"
              label="Phone Number"
              onChange={changePhoneNumHandler}
              value={phoneNum}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, display: "block" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={changePasswordHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ mb: 2, display: "block" }} variant="outlined">
            <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
            <OutlinedInput
              id="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={changePasswordConfirmHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle passwordConfirm visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPasswordConfirm}
                    edge="end"
                  >
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password Confirm"
            />
          </FormControl>
          <Button variant="contained" type="submit" onClick={signUpHandler}>
            Sign Up
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={convertToLoginHandler}
          >
            Log In
          </Button>
        </form>
        <LoginGoogle />
      </Modal>
    </>
  );
}

export default SignupModal;
