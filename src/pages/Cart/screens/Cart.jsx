import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { json, useLoaderData } from "react-router";

export default function Cart() {
  const cartItems = useLoaderData();
  console.log(cartItems);

  return (
    <Stack padding={4}>
      <Typography variant="h1" fontSize={30}>
        Shopping Cart
      </Typography>
      <Typography variant="p">
        {cartItems.length + " items in your cart"}
      </Typography>
      <Stack spacing={1}>
        {cartItems.map((item) => {
          return (
            <Stack direction="row" spacing={2}>
              <Stack width={200} height={100} overflow="hidden">
                <img
                  src={`http://localhost:3000/images/sneakers/${item.sneaker.id}/${item.sneaker.coverImage}`}
                  alt=""
                />
                  </Stack>
                  <Stack>
                      
                  </Stack>
            </Stack>
          );
        })}
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
