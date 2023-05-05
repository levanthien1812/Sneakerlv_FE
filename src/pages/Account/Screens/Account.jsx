import {
  Box,
  Button,
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
import { getUser } from "../../../utils/auth";
import ChangeEmailPopup from "../Components/ChangeEmailPopup";
import { actions as UIActions } from "../../../store/ui";
import { useDispatch } from "react-redux";
import app from '../../../firebase'

function Account() {
  const user = getUser();
  const dispatch = useDispatch()
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNum, setPhoneNum] = useState(user.phoneNum || "Not set");
  const [birthday, setBirthday] = useState(new Date())
  const [gender, setGender] = useState(user.gender || 'female')
  const [photo, setPhoto] = useState(user.photo)
  const [preview, setPreview] = useState()
  const [isChangingEmail, setIsChangingEmail] = useState(false)

  const photoChangeHandler = (event) => {
    setPhoto(event.target.files[0])
  }

  useEffect(() => {
    if (typeof(photo) === 'object'){
      const objectURL = URL.createObjectURL(photo)
      setPreview(objectURL)

      return () => URL.revokeObjectURL(objectURL);
    } else {
      setPreview(photo)
    }
  }, [photo])

  const changeEmailClickHandler = () => {
    setIsChangingEmail(true)
  }

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
  }

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
      <Stack direction="row" spacing={3}>
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
                    defaultValue={name}
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
                  ></TextField>
                  <Button sx={{ textTransform: "capitalize" }} onClick={changeEmailClickHandler}>Change</Button>
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
                    defaultValue={gender}
                    name="gender"
                    row
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
                  <Button variant="contained">Save</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
        <Stack alignItems="center" flexGrow={1}>
          <Box
            width="160px"
            height="160px"
            marginBottom={2}
            borderRadius="50%"
            overflow="hidden"
          >
            <img src={preview} width="100%" height="100%" />
          </Box>
          <TextField
            type="file"
            size="small"
            name="photo"
            style={{ marginBottom: "12px" }}
            onChange={photoChangeHandler}
          />
          <Typography>Maximum size: 2MB</Typography>
          <Typography>Accepted Format: JPEG, PNG</Typography>
        </Stack>
      </Stack>
      {isChangingEmail && <ChangeEmailPopup onConfirmEmailHandler={confirmEmailHandler}/>}
    </Stack>
  );
}

export default Account;
