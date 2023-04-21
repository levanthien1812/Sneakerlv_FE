import React from "react";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { currencyFormatter } from "../../../utils/formatters.js";
import { useNavigate } from "react-router";

function SneakerCard({ sneaker, isSmall }) {
  const navigate = useNavigate();
  const price =
    sneaker.price.min !== sneaker.price.max
      ? currencyFormatter.format(sneaker.price.min) +
        " - " +
        currencyFormatter.format(sneaker.price.max)
      : currencyFormatter.format(sneaker.price.min);

  const imageClickHandler = () => {
    navigate("/sneakers/" + sneaker.slug);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="220"
        image={`http://localhost:3000/images/sneakers/${sneaker.id}/${sneaker.coverImage}`}
        onClick={imageClickHandler}
        sx={{
          cursor: "pointer",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sneaker.brand.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sneaker.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SneakerCard;
