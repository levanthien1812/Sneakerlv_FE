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
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginGoogle } from "../../../utils/loginGoogle";
import { setToken } from "../../../utils/auth";

function SignupModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [error, setError] = useState("");

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
        }),
      });

      const data = await response.json();

      if (data.status === "fail") {
        setError(data.message);
        setEmail("");
        setPassword("");
      } else {
        setToken(data.token);
        dispatch(authActions.setAuth());
        dispatch(authActions.setIsSigningUp(false));
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
    dispatch(authActions.setIsSigningUp(false));
    dispatch(authActions.setIsLoggingIn(true));
  };

  return (
    <Modal
      onCloseModal={dispatch.bind(this, authActions.setIsLoggingIn(false))}
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
        {error && <p>{error}</p>}
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
  );
}

export default SignupModal;
