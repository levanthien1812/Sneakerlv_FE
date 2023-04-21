import React from "react";
import { Grid } from "@mui/material";
import SneakerCard from "./SneakerCard.jsx";

function SneakersList({ currentSneakers }) {
  return (
    <Grid container spacing={4}>
      {currentSneakers.map((snk) => {
        return (
          <Grid item xs={4} key={snk.id}>
            <SneakerCard sneaker={ snk } />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SneakersList;
