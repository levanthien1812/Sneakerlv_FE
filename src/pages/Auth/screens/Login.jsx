import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "../../../components/UI/Modal";
import { actions as authActions } from "../../../store/auth";
import { actions as cartActions, fetchCartItems } from "../../../store/cart";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setToken } from "../../../utils/auth";
import { LoginGoogle } from "../../../utils/loginGoogle";
import { _fetchAddresses } from "../../../store/account";

function LoginModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState("");

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/log-in", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "fail") {
        setError(data.message);
        setEmail("");
        setPassword("");
      } else {
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        dispatch(authActions.setAuthen());
        dispatch(authActions.setIsLoggingIn(false));
        dispatch(fetchCartItems());
        dispatch(_fetchAddresses());
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const convertToSignupHandler = () => {
    dispatch(authActions.setIsLoggingIn(false));
    dispatch(authActions.setIsSigningUp(true));
  };

  return (
    <Modal
      onCloseModal={dispatch.bind(this, authActions.setIsLoggingIn(false))}
    >
      <Typography fontSize={20} mb={2} textAlign="center">
        Đăng nhập
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form style={{ marginTop: "16px" }}>
        <FormControl sx={{ mb: 2, display: "block" }}>
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            onChange={changeEmailHandler}
            value={email}
            fullWidth
          />
        </FormControl>
        <FormControl sx={{ mb: 2, display: "block" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={changePasswordHandler}
            fullWidth
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

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="end" marginBottom={2}>
          <Button variant="contained" type="submit" onClick={loginHandler}>
            Login
          </Button>
          <Typography>or</Typography>
          <Button
            variant="outlined"
            type="button"
            onClick={convertToSignupHandler}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <LoginGoogle />
    </Modal>
  );
}

export default LoginModal;
