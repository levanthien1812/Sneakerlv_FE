import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import firework from "./../../../assets/images/firework.png";
import { Link, useLocation } from "react-router-dom";

function SuccessfullOrder() {
  const { state } = useLocation();
  const paymentMethod = state.paymentMethod;

  return (
    <Stack justifyContent="center" alignItems="center" paddingTop={10}>
      <Stack width={300} height={300}>
        <img src={firework} width="100%" height="100%" />
      </Stack>
      <Stack marginTop={6} width="60%" textAlign="center">
        <Typography fontSize={24} color="green">
          Your order has been created!
        </Typography>

        {paymentMethod === "transfer" && (
          <Typography marginTop={2} fontSize={18}>
            Your payment method is to transfer so you need to transfer the
            needed money <em>within 72 hours</em>. If you has payed for the
            order, go to
            <Link style={{ fontWeight: "bold" }}> your orders</Link> to track
            the order. However, after 72 hours, if you don't pay for the order,
            your order <em>will be deleted.</em>
          </Typography>
        )}
        {paymentMethod === "cash" && (
          <Typography marginTop={2} fontSize={18}>
            Please prepare the needed money when the shipper phone you to
            receiver your product at the shipping address.
          </Typography>
        )}
      </Stack>
      <Stack marginTop={2} direction="row" spacing={2}>
        <Button variant="contained" style={{ width: "150px" }}>
          <Link to="/" style={{ color: "inherit" }}>
            Home
          </Link>
        </Button>
        <Button variant="outlined" style={{ width: "150px" }}>
          <Link to="/my-orders" style={{ color: "inherit" }}>
            Your orders
          </Link>
        </Button>
      </Stack>
    </Stack>
  );
}

export default SuccessfullOrder;
