import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchAddresses } from "../../../store/account";
import { actions as accountActions } from "../../../store/account";
import Address from "../Components/Address";
import Modal from "../../../components/UI/Modal";

function ChooseAddress({ setChosenAddress }) {
  const dispatch = useDispatch();
  const { addresses, isAddingAddress } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(_fetchAddresses());
  }, []);

  const chooseHandler = (address) => {
    setChosenAddress(address);
  };

  return (
    <Modal
      width="40%"
      onCloseModal={() => dispatch(accountActions.setIsChangingAddress(false))}
    >
      <Stack
        flexGrow={1}
        borderRadius={5}
        paddingY={3}
        paddingX={5}
        sx={{
          backgroundColor: "#fff",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2" fontSize={24} marginBottom={3}>
            Pickup Addresses
          </Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              dispatch(accountActions.setIsAddingAddress(true));
              dispatch(accountActions.setIsChangingAddress(false));
            }}
          >
            Add address
          </Button>
        </Stack>
        <Divider />
        <Stack marginTop={2}>
          {addresses.length > 0 &&
            addresses.map((address) => (
              <Address
                key={Math.random()}
                address={address}
                onChoose={chooseHandler}
              />
            ))}
        </Stack>
      </Stack>
    </Modal>
  );
}

export default ChooseAddress;
