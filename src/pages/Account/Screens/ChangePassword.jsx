import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Stack
      flexGrow={1}
      borderRadius={5}
      paddingY={3}
      paddingX={5}
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h2" fontSize={24} marginBottom={3}>
        Change password
      </Typography>
      <Stack paddingX="30%" alignItems="center">
        <FormControl
          sx={{ mb: 2, display: "block" }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="medium"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default ChangePassword;
