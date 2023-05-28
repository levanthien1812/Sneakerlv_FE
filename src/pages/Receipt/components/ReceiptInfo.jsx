import React from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../../utils/formatters";

function ReceiptInfo({
  chosenCartItems,
  onPlaceOrder,
  shippingFee,
  isOrdering,
}) {
  const productsPrice = chosenCartItems.reduce(
    (prev, curr) => prev + curr.category.price * curr.quantity,
    0
  );

  return (
    <Stack
      style={{
        border: "2px solid orange",
        backgroundColor: "#f1edd955",
      }}
      padding={2}
      minWidth="33%"
      height="fit-content"
    >
      <Typography textAlign="center" variant="h6">
        Chosen Products
      </Typography>
      <Stack
        marginTop={3}
        style={{ backgroundColor: "white" }}
        divider={<Divider />}
        padding={1}
        boxShadow={2}
      >
        {chosenCartItems.map((item) => (
          <Stack
            key={item._id}
            direction="row"
            height="120px"
            spacing={2}
            padding={1}
            
          >
            <Stack height="100%">
              <img
                height="100%"
                src={
                  "http://localhost:3000/images/sneakers/" +
                  item.sneaker.id +
                  "/" +
                  item.sneaker.coverImage
                }
              />
            </Stack>
            <Stack>
              <Typography fontSize={14}>{item.sneaker.name}</Typography>
              <Typography>
                {currencyFormatter.format(item.category.price) +
                  " x" +
                  item.quantity}
              </Typography>
              <Typography textAlign="right" fontWeight="bold">
                {currencyFormatter.format(item.category.price * item.quantity)}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack marginTop={2} alignItems="end">
        <Stack direction="row" spacing={1}>
          <Typography>Products price: </Typography>
          <Typography fontSize={17} fontWeight={600}>
            {currencyFormatter.format(productsPrice)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} marginTop={1}>
          <Typography>Shipping fee: </Typography>
          <Typography fontSize={17} fontWeight={600}>
            {currencyFormatter.format(shippingFee)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="end" marginTop={2}>
          <Typography>Total: </Typography>
          <Chip
            style={{
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              color: "#029330",
            }}
            label={currencyFormatter.format(productsPrice + shippingFee)}
          />
        </Stack>
      </Stack>

      <Stack marginTop={5}>
        <Button
          variant="contained"
          style={{ borderRadius: 0, backgroundColor: "orange" }}
          onClick={() => onPlaceOrder(productsPrice + shippingFee)}
        >
          {isOrdering && (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
              }}
            />
          )}
          {!isOrdering && "Place order"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default ReceiptInfo;
