import {
  Avatar,
  Button,
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
import { format } from "date-fns";
import { currencyFormatter } from "../../../utils/formatters";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusChosen, setStatusChosen] = useState("all");

  const fetchOrders = async (statusChosen = null) => {
    const _orders = statusChosen
      ? await getOrders(statusChosen)
      : await getOrders();
    setOrders(_orders);
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  useEffect(() => {
    fetchOrders(statusChosen);
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

      <Stack marginTop={2} spacing={2}>
        {orders.map((order) => (
          <Stack spacing={1}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography>
                {format(new Date(order.createdAt), "dd/MM/yyyy")}
              </Typography>
              <Typography
                textTransform={"uppercase"}
                fontWeight={600}
                style={{ color: "#FFA41B" }}
              >
                {order.status}
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {order.cartItems.map((item) => (
                <Stack direction={"row"} spacing={2}>
                  <Stack>
                    <Avatar
                      src={`http://localhost:3000/images/sneakers/${item.sneaker.id}/${item.sneaker.coverImage}`}
                      variant="square"
                      sx={{
                        width: 150,
                        height: 80,
                      }}
                    ></Avatar>
                  </Stack>
                  <Stack flexGrow={1}>
                    <Typography>{item.sneaker.name}</Typography>
                    <Typography>{"x" + item.quantity}</Typography>
                  </Stack>
                  <Stack justifyContent={"center"}>
                    <Typography fontWeight={600} color={"orange"}>
                      {currencyFormatter.format(item.price)}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack
              justifyContent={
                order.status === "received" ? "space-between" : "end"
              }
              direction={"row"}
              spacing={2}
            >
              {order.status === "received" && (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orange" }}
                  size="small"
                >
                  Buy again
                </Button>
              )}
              <Typography>
                Tổng tiền:{" "}
                <span
                  style={{ fontSize: 20, color: "orange", fontWeight: "bold" }}
                >
                  {currencyFormatter.format(order.totalPrice)}
                </span>
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack marginTop={2}></Stack>
    </Stack>
  );
}

export default Orders;
