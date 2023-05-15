import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";
import AddAddress from "../Components/AddAddress";
import { useDispatch, useSelector } from "react-redux";
import { _fetchAddresses } from "../../../store/account";
import { actions as accountActions } from "../../../store/account";
import Address from "../Components/Address";

function Addresses() {
  const dispatch = useDispatch();
  const { addresses, isAddingAddress } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(_fetchAddresses());
  }, []);

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" fontSize={24} marginBottom={3}>
          Pickup Addresses
        </Typography>
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            dispatch(accountActions.setIsAddingAddress(true));
          }}
        >
          Add address
        </Button>
      </Stack>
      <Divider />
      <Stack marginTop={2}>
        {addresses.length > 0 &&
          addresses.map((address) => (
            <Address key={Math.random()} address={address} />
          ))}
      </Stack>
      {isAddingAddress && (
        <AddAddress
          onClose={() => {
            dispatch(accountActions.setIsAddingAddress(false));
          }}
        />
      )}
    </Stack>
  );
}

// export const loadAddresses = async () => {
//   const response = await fetch(
//     "http://localhost:3000/api/users/account/addresses",
//     {
//       credentials: "include",
//     }
//   );

//   const data = await response.json();
//   return data.data || null;
// };

export default Addresses;
