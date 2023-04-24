import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";

function CartPopup({ onGoToCartClick }) {
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
    <Box
      position="absolute"
      top={60}
      right={0}
      padding={0}
      bgcolor="white"
      zIndex={10}
      boxShadow={1}
    >
      <Stack p={2} spacing={1}>
        {items.map((item) => (
          <CartItemCard item={item} />
        ))}
        <Button variant="contained" color="secondary" onClick={onGoToCartClick}>
          <Link to="/cart" style={{ color: "white" }}>
            Go to cart
          </Link>
        </Button>
      </Stack>
    </Box>
  );
}

export default CartPopup;
