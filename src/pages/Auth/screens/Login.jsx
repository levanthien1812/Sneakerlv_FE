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
        setEmail('')
        setPassword('')
      } else {
        const token = data.token;
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + parseInt(1));

        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expiration.toISOString());

        dispatch(authActions.login());
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal onCloseModal={dispatch.bind(this, authActions.closeLogin())}>
      <Typography fontSize={20} mb={2}>
        Đăng nhập
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
        {error && <p>{error}</p>}
        <Button variant="contained" type="submit" onClick={loginHandler}>
          Login
        </Button>
      </form>
    </Modal>
  );
}

export default LoginModal;
