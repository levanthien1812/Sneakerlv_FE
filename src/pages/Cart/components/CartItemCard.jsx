import React from "react";
import { CardMedia, Stack } from "@mui/material";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { currencyFormatter } from "../../../utils/formatters.js";
import { useNavigate } from "react-router";

function CartItemCard({ item }) {
  const { sneaker, category, quantity } = item;
  const navigate = useNavigate();

  const imageClickHandler = () => {
    navigate("/carts");
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="120"
        image={
          category.image.length > 0
            ? `http://localhost:3000/images/sneakers/${sneaker.id}/${category.image}`
            : `http://localhost:3000/images/sneakers/${sneaker.id}/${sneaker.coverImage}`
        }
        onClick={imageClickHandler}
        sx={{
          cursor: "pointer",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {sneaker.name}
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {currencyFormatter.format(category.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`x${quantity}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CartItemCard;
