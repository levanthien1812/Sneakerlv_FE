import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function SneakersPage() {
  const [sneakers, setSneakers] = useState([]);

  const fetchSneakers = () => {
    fetch("http://localhost:3000/api/sneakers")
      .then((res) => res.json())
      .then((data) => setSneakers(data.data));
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  return (
    <div>
      {sneakers.map((snk) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="220"
            image={`http://localhost:3000/images/sneakers/${snk.id}/${snk.coverImage}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {snk.brand.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {snk.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {snk.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SneakersPage;
