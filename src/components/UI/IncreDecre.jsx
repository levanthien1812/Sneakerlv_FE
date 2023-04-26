import React from "react";
import { ButtonGroup, Button } from "@mui/material";

function IncreDecre({ quantity, decrement, increment }) {
  const quantityBtnsStyle = {
    paddingX: "8px",
    paddingY: "3px",
    borderRadius: "0",
    borderColor: "black",
    color: "black",
    fontSize: "16px",
    "&:hover": {
      borderColor: "black",
    },
  };

  return (
    <ButtonGroup variant="outlined">
      <Button
        sx={{ ...quantityBtnsStyle, borderRightWidth: "0" }}
        onClick={() => decrement()}
      >
        -
      </Button>
      <Button
        sx={{
          ...quantityBtnsStyle,
          borderRightWidth: "0",
          borderLeftWidth: "0",
        }}
      >
        {quantity}
      </Button>
      <Button
        sx={{ ...quantityBtnsStyle, borderLeftWidth: "0" }}
        onClick={() => increment()}
      >
        +
      </Button>
    </ButtonGroup>
  );
}

export default IncreDecre;
