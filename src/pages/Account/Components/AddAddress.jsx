import React, { useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getDistricts, getProvinces, getWards } from "../../../services";
import { useDispatch } from "react-redux";
import { _fetchAddresses } from "../../../store/account";

function AddAddress({ onClose }) {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provinceChosen, setProvinceChosen] = useState(79);
  const [districts, setDistricts] = useState([]);
  const [districtChosen, setDistrictChosen] = useState(785);
  const [wards, setWards] = useState([]);
  const [wardChosen, setWardChosen] = useState(27595);
  const [street, setStreet] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProvinces() {
      const _provinces = await getProvinces();
      setProvinces(_provinces);
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      const _districts = await getDistricts(provinceChosen);
      setDistricts(_districts);
      setDistrictChosen(_districts[0].district_id);
    }
    fetchDistricts();
  }, [provinceChosen]);

  useEffect(() => {
    async function fetchWards() {
      const _wards = await getWards(districtChosen);
      setWards(_wards);
      setWardChosen(_wards[0].ward_id);
    }
    fetchWards();
  }, [districtChosen]);

  const saveNewAddressHandler = async () => {
    const newAddress = {
      name,
      phoneNum,
      address: {
        province: provinceChosen,
        district: districtChosen,
        ward: wardChosen,
        street,
      },
      isDefault,
    };

    const res = await fetch(
      "http://localhost:3000/api/users/account/addresses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
        credentials: "include",
      }
    );

    if (!res.ok) {
      return setError("Something went wrong while saving your new address!");
    }

    const data = await res.json();
    if (data.status === "fail") {
      return setError(data.message);
    }
    setError(null);
    // console.log("New address: " + JSON.parse(data.data));
    dispatch(_fetchAddresses());
    onClose()
  };

  return (
    <Modal
      onCloseModal={() => {
        onClose();
      }}
      width="35%"
    >
      <Typography variant="h5" marginTop={1}>
        New pickup address
      </Typography>
      {error && (
        <Alert severity="error" marginTop={3}>
          {error}
        </Alert>
      )}
      <Stack marginTop={3}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Receiver's name"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
          ></TextField>
          <TextField
            label="Phone number"
            size="small"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
            fullWidth
          ></TextField>
        </Stack>
        <Stack direction="row" spacing={1} marginTop={3}>
          <FormControl fullWidth>
            <InputLabel id="province">Province</InputLabel>
            <Select
              labelId="province"
              id="province"
              size="small"
              label="province"
              value={provinceChosen}
              onChange={(e) => setProvinceChosen(e.target.value)}
            >
              {provinces.map((province) => (
                <MenuItem
                  key={province.province_id}
                  value={province.province_id}
                >
                  {province.province_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="district">District</InputLabel>
            <Select
              labelId="district"
              id="district"
              size="small"
              label="district"
              value={districtChosen}
              onChange={(e) => setDistrictChosen(e.target.value)}
            >
              {districts.map((district) => (
                <MenuItem
                  key={district.district_id}
                  value={district.district_id}
                >
                  {district.district_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="ward">Ward</InputLabel>
            <Select
              labelId="ward"
              id="ward"
              size="small"
              label="ward"
              value={wardChosen}
              onChange={(e) => setWardChosen(e.target.value)}
            >
              {wards.map((ward) => (
                <MenuItem key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack marginTop={2}>
          <TextField
            label="House Number & Street"
            size="small"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </Stack>
        <Stack marginTop={2}>
          <FormControlLabel
            control={<Checkbox />}
            label="Set as default address"
            value={isDefault}
            onChange={(e) => {
              setIsDefault(e.target.checked);
            }}
          />
        </Stack>
      </Stack>
      <Stack justifyContent="end" direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={saveNewAddressHandler}>
          Save
        </Button>
      </Stack>
    </Modal>
  );
}

export default AddAddress;
