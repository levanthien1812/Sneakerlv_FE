import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { getUser, logout, setUser } from "../../../utils/auth";
import ChangeEmailPopup from "../Components/ChangeEmailPopup";
import { actions as UIActions } from "../../../store/ui";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import { actions as authActions } from "../../../store/auth";

function Account() {
  const user = getUser();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [phoneNum, setPhoneNum] = useState(user.phoneNum || "Not set");
  const [birthday, setBirthday] = useState(format(new Date(), "yyyy-MM-dd"));
  const [gender, setGender] = useState(user.gender || "female");
  const [photo, setPhoto] = useState(user.photo);
  const [preview, setPreview] = useState();
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [error, setError] = useState(null);

  const nameChangeHander = (event) => {
    setName(event.target.value);
    if (event.target.value.length === 0)
      return setError("Your name must not be empty!");
    setError(null);
  };

  const birthdayChangeHandler = (event) => {
    if (new Date(event.target.value).getTime() > new Date().getTime())
      return setError("Your birthday must be before today!");
    setBirthday(event.target.value);
    setError(null);
  };

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const photoChangeHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    if (typeof photo === "object") {
      const objectURL = URL.createObjectURL(photo);
      setPreview(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    } else {
      setPreview(
        "http://localhost:3000/images/users/" + user._id + "/" + photo
      );
    }
  }, [photo]);

  const changeEmailClickHandler = () => {
    setIsChangingEmail(true);
  };

  const confirmEmailHandler = (newEmail) => {
    dispatch(
      UIActions.showNotification({
        title: "Nofication",
        message:
          "We have sent a verification code to your new email! Please copy the code to confirm your email!",
        type: "success",
        duration: 4000,
      })
    );
    setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 4000);
  };

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    try {
      const userFormdata = new FormData();
      userFormdata.append("name", name);
      userFormdata.append("email", email);
      userFormdata.append("phoneNum", phoneNum);
      userFormdata.append("birthday", birthday);
      userFormdata.append("gender", gender);
      userFormdata.append("photo", photo);

      const response = await fetch(
        "http://localhost:3000/api/users/account/profile",
        {
          method: "PATCH",
          body: userFormdata,
          withCredentials: true,
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError("Fail to update your profile! Something went wrong.");
      }

      const data = await response.json();
      setUser(JSON.stringify(data.data));
      dispatch(authActions.setUser(data.data));

      if (data.status === "fail") {
        setError(data.message);
      }
    } catch (err) {}
  };

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
        My profile
      </Typography>
      <Divider />
      <Stack marginTop={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction="row" spacing={3} marginTop={1}>
          <Form style={{ flexGrow: 1, minWidth: "60%" }}>
            <table cellSpacing={10}>
              <tbody>
                <tr>
                  <td>
                    <FormLabel htmlFor="name">Name: </FormLabel>
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="name"
                      value={name}
                      onChange={nameChangeHander}
                    ></TextField>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormLabel htmlFor="email">Email: </FormLabel>
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="email"
                      defaultValue={email}
                      InputProps={{
                        readOnly: true,
                      }}
                    ></TextField>
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      onClick={changeEmailClickHandler}
                    >
                      Change
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormLabel htmlFor="phoneNum">Phone Number: </FormLabel>
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="phoneNum"
                      defaultValue={phoneNum}
                      InputProps={{
                        readOnly: true,
                      }}
                    ></TextField>
                    <Button sx={{ textTransform: "capitalize" }}>Change</Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormLabel htmlFor="birthday">Birthday: </FormLabel>
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="birthday"
                      type="date"
                      value={birthday}
                      onChange={birthdayChangeHandler}
                    ></TextField>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormLabel htmlFor="gender">Gender: </FormLabel>
                  </td>
                  <td>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="gender"
                      row
                      value={gender}
                      onChange={genderChangeHandler}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={updateProfileHandler}
                      disabled={error !== null}
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
          <Stack alignItems="center" flexGrow={1}>
            <Avatar src={preview} sx={{ width: 200, height: 200, border: "2px solid #eee" }}></Avatar>
            <TextField
              type="file"
              size="small"
              name="photo"
              style={{ marginBottom: "12px", marginTop: 20 }}
              onChange={photoChangeHandler}
            />
            <Typography>Maximum size: 2MB</Typography>
            <Typography>Accepted Format: JPEG, PNG</Typography>
          </Stack>
        </Stack>
        {isChangingEmail && (
          <ChangeEmailPopup onConfirmEmailHandler={confirmEmailHandler} />
        )}
      </Stack>
    </Stack>
  );
}

export default Account;
