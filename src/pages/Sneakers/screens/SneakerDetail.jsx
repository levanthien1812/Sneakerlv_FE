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
import { json, useLoaderData, useNavigate } from "react-router";
import { currencyFormatter } from "../../../utils/formatters";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ImagesSwiper from "../components/SneakerImagesSwiper";
import RelatedSneakers from "../components/RelatedSneakers";
import { useDispatch, useSelector } from "react-redux";
import { actions as UIActions } from "../../../store/ui";
import { actions as authActions } from "../../../store/auth";
import { actions as cartAction } from "../../../store/cart";
import MyAlert from "../../../components/UI/Alert";
import { isAuthenticated } from "../../../utils/auth";
import IncreDecre from "../../../components/UI/IncreDecre";

function SneakerDetail() {
  const dispatch = useDispatch();
  const { isNotifShown } = useSelector((state) => state.ui);
  const { sneaker, categories, related } = useLoaderData();

  const imageLists = [sneaker.coverImage, ...sneaker.images].map((img) => {
    return `http://localhost:3000/images/sneakers/${sneaker.id}/${img}`;
  });

  const [categoryChosen, setCategoryChosen] = useState(categories[0]);
  const [quantityChosen, setQuantityChosen] = useState(1);
  const [quantityInStock, setQuantityInStock] = useState(
    categoryChosen.quantity
  );

  const [tab, setTab] = React.useState("description");

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const sizeChangeHandler = (event, categoryId) => {
    const category = categories.find((cate) => cate._id === categoryId);
    setCategoryChosen(category);
    setQuantityInStock(category.quantity);
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

  const addToCartHandler = async () => {
    if (!isAuthenticated()) {
      dispatch(
        UIActions.showNotification({
          title: "Remind!",
          message: "You are not logged in! Please log in.",
          type: "warning",
        })
      );
      setTimeout(() => {
        dispatch(UIActions.hideNotification());
        return dispatch(authActions.setIsLoggingIn(true));
      }, 2500);
    } else {
      const response = await fetch(
        "http://localhost:3000/api/sneakers/" + sneaker.slug,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sneaker: sneaker._id,
            category: categoryChosen._id,
            quantity: quantityChosen,
          }),
          withCredentials: true,
          credentials: "include",
        }
      );

      if (!response.ok) {
        dispatch(
          UIActions.showNotification({
            title: "Fail!",
            message: "Can not add this item to cart!",
            type: "error",
            duration: 2500,
          })
        );
      } else {
        dispatch(
          UIActions.showNotification({
            title: "Success!",
            message: "Added to cart successfully!",
            type: "success",
            duration: 2500,
          })
        );
      }
      setTimeout(() => {
        dispatch(UIActions.hideNotification());
      }, 2500);
    }
  };

  const orderHandler = () => {};

  return (
    <Stack padding={3}>
      {/* sneaker's information */}
      <Grid container marginBottom={4}>
        {/* sneaker's images */}
        <Grid item xs={7}>
          <ImagesSwiper images={imageLists} />
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
                <IncreDecre
                  quantity={quantityChosen}
                  increment={incrementQuantityHandler}
                  decrement={decrementQuantityHandler}
                />
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
            {/* add to cart & buy button */}
            <Stack direction="row" marginBottom={3} spacing={2}>
              <IconButton sx={buyBtnStyle} onClick={addToCartHandler}>
                <ShoppingCart />
              </IconButton>
              <Button
                onClick={orderHandler}
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
            {/* description & reviews */}
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tab}>
                <Box>
                  <TabList
                    onChange={handleTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Mô tả"
                      value="description"
                      sx={{ flexGrow: "1" }}
                    />
                    <Tab
                      label="Đánh giá"
                      value="reviews"
                      sx={{ flexGrow: "1" }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="description">
                  {sneaker.description.length === 0
                    ? "No description available"
                    : sneaker.description}
                </TabPanel>
                <TabPanel value="reviews">Chưa có đánh giá nào</TabPanel>
              </TabContext>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {/* related items */}
      <RelatedSneakers sneakers={related} />
      {isNotifShown && <MyAlert />}
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
