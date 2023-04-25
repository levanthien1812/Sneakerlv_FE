import { Circle, Favorite, Star } from "@mui/icons-material";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { json, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currencyFormatter } from "../../../utils/formatters";

export default function Cart() {
  const cartItems = useLoaderData();
  console.log(cartItems);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <Stack padding={4}>
      <Typography variant="h1" fontSize={30}>
        Shopping Cart
      </Typography>
      <Typography variant="p">
        {cartItems.length + " items in your cart"}
      </Typography>
      <Stack direction="row" spacing={8}>
        <Stack spacing={2} marginTop={2}>
          {cartItems.map((item) => {
            return (
              <Stack direction="row">
                <Stack
                  width={200}
                  height={120}
                  overflow="hidden"
                  justifyContent="center"
                  marginRight={2}
                >
                  <img
                    width="100%"
                    src={`http://localhost:3000/images/sneakers/${item.sneaker.id}/${item.sneaker.coverImage}`}
                    alt=""
                  />
                </Stack>
                <Stack direction="row" spacing={10} marginRight={10}>
                  <Stack>
                    <Typography variant="p">{item.sneaker.name}</Typography>
                    <Typography variant="p">
                      {item.sneaker.brand.name}
                    </Typography>
                    <Stack direction="row">
                      <Typography variant="p">
                        {item.sneaker.rating.toFixed(1)}
                      </Typography>
                      <StyledRating
                        name="customized-color"
                        readOnly
                        defaultValue={item.sneaker.rating}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.1}
                        icon={<Favorite fontSize="inherit" />}
                        emptyIcon={<Favorite fontSize="inherit" />}
                      />
                      <Typography variant="p">{`(${
                        item.sneaker.ratingQuantity || 0
                      } ratings)`}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="p">
                        Size: {item.category.size}
                      </Typography>
                      <Typography variant="p" color="#ccc">
                        |
                      </Typography>
                      <Typography variant="p">
                        In stock: {item.category.quantity}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="end">
                    <Button variant="text" sx={{ textTransform: "capitalize" }}>
                      Remove
                    </Button>
                    <Button variant="text" sx={{ textTransform: "capitalize" }}>
                      Choose to buy
                    </Button>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="p">
                    {currencyFormatter.format(item.category.price)}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        <Stack>
          <Typography>Total</Typography>
          <Typography variant="p" fontSize={32} fontWeight={600}>
            {currencyFormatter.format(1000000)}
          </Typography>
          <Typography fontSize={20} color="#444">70% off</Typography>
          <Button variant="contained">Checkout</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const cartLoader = async () => {
  const resonse = await fetch("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: "include",
  });

  if (!resonse.ok) {
    throw json({ message: "Error when loading cart items!" }, { status: 500 });
  }

  const { data } = await resonse.json();
  return data;
};
