import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "../../../services";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusChosen, setStatusChosen] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(await getOrders());
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(await getOrders(statusChosen));
    };
    fetchOrders();
  }, [statusChosen]);

  console.log(orders);

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
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" fontSize={24} marginBottom={3}>
          My orders
        </Typography>
        <FormControl size="small" style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusChosen}
            label="Status"
            onChange={(event) => {
              setStatusChosen(event.target.value);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="shipping">Shipping</MenuItem>
            <MenuItem value="received">Received</MenuItem>
            <MenuItem value="cancelled">Canceled</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider />

      <Stack></Stack>
      <Stack marginTop={2}></Stack>
    </Stack>
  );
}

export default Orders;
