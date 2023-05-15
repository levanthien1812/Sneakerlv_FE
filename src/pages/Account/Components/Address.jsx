import { Button, Chip, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import MyDialog from "../../../components/UI/Dialog";
import { deleteAddress } from "../../../services";
import { useDispatch } from "react-redux";
import { _fetchAddresses } from "../../../store/account";
import AddAddress from "./AddAddress";

function Address({ address }) {
  const dispatch = useDispatch();
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteHandler = async () => {
    await deleteAddress(address._id);
    dispatch(_fetchAddresses());
  };

  const updateHandler = async () => {};

  return (
    <Stack direction="row" justifyContent="space-between" marginTop={2}>
      <Stack alignItems="start">
        <Typography>
          {address.name} | {address.phoneNum}
        </Typography>
        <Typography>{address.address.street}</Typography>
        <Typography>
          {address.address.ward +
            ", " +
            address.address.district +
            ", " +
            address.address.province}
        </Typography>
        {address.isDefault && (
          <Chip label="Default" color="success" size="small" />
        )}
      </Stack>
      <Stack>
        <Stack direction="row" spacing={1}>
          {!address.isDefault && (
            <Button variant="outlined" size="small">
              Set as default
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsUpdating(true)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsConfirmDelete(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      {isConfirmDelete && (
        <MyDialog
          title="Warning"
          message="Are you sure to delete this addresses?"
          onClose={() => setIsConfirmDelete(false)}
          onAccept={deleteHandler}
        />
      )}

      {isUpdating && (
        <AddAddress onClose={() => setIsUpdating(false)} address={address} />
      )}
    </Stack>
  );
}

export default Address;
