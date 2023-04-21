import { Add, Remove, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { json, useLoaderData } from "react-router";
import { currencyFormatter } from "../../../utils/others";

function SneakerDetail() {
  const { sneaker, categories, related } = useLoaderData();

  const [categoryChosen, setCategoryChosen] = useState(categories[0]);
  const [quantityChosen, setQuantityChosen] = useState(1);
  const [quantityInStock, setQuantityInStock] = useState(
    categoryChosen.quantity
  );

  const sizeChangeHandler = (event, categoryId) => {
    const category = categories.find((cate) => cate._id === categoryId);
    setCategoryChosen(category);
    setQuantityInStock(category.quantity);
  };

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

  const buyBtnStyle = {
    paddingX: "24px",
    paddingY: "3px",
    fontSize: "16px",
    borderRadius: "0",
    color: "black",
    border: "1px solid black",
    backgroundColor: "#ddd",
  };

  const incrementQuantityHandler = () => {
    setQuantityChosen((prevState) => prevState + 1);
  };

  const decrementQuantityHandler = () => {
    setQuantityChosen((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  return (
    <Stack padding={3}>
      {/* sneaker's information */}
      <Grid container>
        {/* sneaker's images */}
        <Grid item xs={7}>
          <Stack>
            <Stack
              height={500}
              overflow="hidden"
              marginBottom={2}
              justifyContent="center"
              alignItems="center"
            >
              <img
                style={{ width: "100%" }}
                src={`http://localhost:3000/images/sneakers/${sneaker.id}/${sneaker.coverImage}`}
              ></img>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                overflowX: "scroll",
              }}
            >
              {/* <IconButton>
                <ChevronLeft />
              </IconButton> */}
              {sneaker.images.map((img) => (
                <Stack
                  key={img}
                  sx={{ minWidth: "25%", maxWidth: "33.33%" }}
                  height={160}
                  overflow="hidden"
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                >
                  <img
                    style={{ width: "100%" }}
                    src={`http://localhost:3000/images/sneakers/${sneaker.id}/${img}`}
                  ></img>
                </Stack>
              ))}
              {/* <IconButton>
                <ChevronRight />
              </IconButton> */}
            </Stack>
          </Stack>
        </Grid>
        {/* sneaker's statistics */}
        <Grid item xs={5}>
          <Stack paddingX={4} paddingTop={2}>
            {/* sneaker's name and price */}
            <Typography variant="p" fontSize={30} marginBottom={2}>
              {sneaker.brand.name}
            </Typography>
            <Typography
              variant="h2"
              fontSize={36}
              marginBottom={1}
              fontWeight={600}
            >
              {sneaker.name}
            </Typography>
            <Typography
              textTransform="uppercase"
              marginBottom={2}
              fontSize={20}
            >
              {currencyFormatter.format(categoryChosen.price)}
            </Typography>

            <Divider sx={{ marginBottom: "24px" }} />

            {/* sneaker's id */}
            <Typography
              textTransform="uppercase"
              marginBottom={2}
            >{`Mã sản phẩm: ${sneaker.id}`}</Typography>

            {/* sneaker's sizes */}
            <Typography variant="p" marginBottom={1} textTransform="uppercase">
              Kích thước:
            </Typography>
            <ToggleButtonGroup
              value={categoryChosen._id}
              exclusive
              onChange={sizeChangeHandler}
              aria-label="text alignment"
              sx={{
                marginBottom: "16px",
              }}
            >
              {categories.map((cate) => (
                <ToggleButton
                  sx={{
                    paddingX: "24px",
                    paddingY: "3px",
                    fontSize: "16px",
                    borderRadius: "0",
                    color: "black",
                    borderColor: "black",
                  }}
                  key={cate._id}
                  value={cate._id}
                  aria-label="left aligned"
                >
                  {cate.size}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* choose quantity */}
            <Stack direction="row" spacing={5} marginBottom={3}>
              <Stack>
                <Typography
                  variant="p"
                  marginBottom={1}
                  textTransform="uppercase"
                >
                  Số lượng:
                </Typography>
                <ButtonGroup variant="outlined">
                  <Button
                    sx={{ ...quantityBtnsStyle, borderRightWidth: "0" }}
                    onClick={decrementQuantityHandler}
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
                    {quantityChosen}
                  </Button>
                  <Button
                    sx={{ ...quantityBtnsStyle, borderLeftWidth: "0" }}
                    onClick={incrementQuantityHandler}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Stack>
              <Stack>
                <Typography
                  variant="p"
                  marginBottom={1}
                  textTransform="uppercase"
                >
                  Trong kho:
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    paddingX: "24px",
                    paddingY: "3px",
                    fontSize: "16px",
                    borderRadius: "0",
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      borderColor: "black",
                    },
                    cursor: "default",
                  }}
                >
                  {quantityInStock}
                </Button>
              </Stack>
            </Stack>

            {/* buy button */}
            <Stack direction="row" marginBottom={3} spacing={2}>
              <IconButton sx={buyBtnStyle}>
                <ShoppingCart />
              </IconButton>
              <Button
                variant="outlined"
                sx={{
                  ...buyBtnStyle,
                  flexGrow: "1",
                  "&:hover": {
                    borderColor: "black",
                    backgroundColor: "#EC9F12",
                    color: "white",
                  },
                }}
              >
                MUA NGAY
              </Button>
            </Stack>

            <Divider />
            
          </Stack>
        </Grid>
      </Grid>
      <Stack></Stack>
    </Stack>
  );
}

export const sneakerLoader = async ({ request, params }) => {
  const resonse = await fetch(
    "http://localhost:3000/api/sneakers/" + params.slug
  );

  if (!resonse.ok) {
    throw json(
      { message: "Error when loading sneaker detail!" },
      { status: 500 }
    );
  }

  const { data } = await resonse.json();
  return data;
};

export default SneakerDetail;
