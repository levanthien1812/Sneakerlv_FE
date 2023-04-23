import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";

function CartPopup() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(
        "http://localhost:3000/api/carts/?quantity=3",
        { withCredentials: true, credentials: "include" }
      );

      const data = await response.json();
      setItems(data.data);
    }

    fetchCart();
  }, []);

  return (
    <Stack p={2}>
      {items.map((item) => (
        <CartItemCard item={item} />
      ))}
    </Stack>
  );
}

export default CartPopup;
