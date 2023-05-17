import { Favorite } from "@mui/icons-material";
import { Button, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { currencyFormatter } from "../../../utils/formatters";
import IncreDecre from "../../../components/UI/IncreDecre";
import { actions as cartActions, saveCartItems } from "../../../store/cart";
import { useDispatch } from "react-redux";
import { getCartFromLS } from "../../../utils/cart";
import { useNavigate } from "react-router";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isChosen, setIsChosen] = useState(item.isChosen);

  const incrementQuantityHandler = () => {
    dispatch(cartActions.increQuantity(item._id));
    dispatch(saveCartItems(getCartFromLS()));
  };

  const decrementQuantityHandler = () => {
    dispatch(cartActions.decreQuantity(item._id));
    dispatch(saveCartItems(getCartFromLS()));
  };

  const removeCartItemHandler = () => {
    dispatch(cartActions.removeFromCart(item));
    dispatch(saveCartItems(getCartFromLS()));
  };

  const chooseToBuyHandler = () => {
    setIsChosen(!isChosen);
    dispatch(cartActions.setChosen({ id: item._id, isChosen: !isChosen }));
    dispatch(saveCartItems(getCartFromLS()));
  };

  const clickHandler = () => {
    console.log(item)
    navigate('/sneakers/' + item.sneaker.slug)
  }

  return (
    <Stack
      direction="row"
      bgcolor={isChosen ? "#00000011" : "#fff"}
      sx={
        isChosen
          ? {
              borderWidth: "3px",
              borderColor: "#666",
              borderStyle: "solid",
            }
          : {
              border: "none",
            }
      }
      padding={2}
      borderRadius={3}
    >
      <Stack
        width={200}
        height={120}
        overflow="hidden"
        justifyContent="center"
        marginRight={2}
      >
        <img
          width="100%"
          src={`http://localhost:3000/images/sneakers/${item.sneaker.id}/${item.sneaker.coverImage}`}
          alt=""
          onClick={clickHandler}
        />
      </Stack>
      <Stack direction="row" spacing={10} marginRight={10}>
        <Stack>
          <Typography variant="p" onClick={clickHandler} fontSize={20} marginBottom={1}>{item.sneaker.name}</Typography>
          <Typography variant="p">{item.sneaker.brand.name}</Typography>
          <Stack direction="row">
            <Typography variant="p">
              {item.sneaker.rating.toFixed(1)}
            </Typography>
            <StyledRating
              name="customized-color"
              readOnly
              defaultValue={item.sneaker.rating}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.1}
              icon={<Favorite fontSize="inherit" />}
              emptyIcon={<Favorite fontSize="inherit" />}
            />
            <Typography variant="p">{`(${
              item.sneaker.ratingQuantity || 0
            } ratings)`}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="p">Size: {item.category.size}</Typography>
            <Typography variant="p" color="#ccc">
              |
            </Typography>
            <Typography variant="p">
              In stock: {item.category.quantity}
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="end">
          <Button
            variant="text"
            sx={{ textTransform: "capitalize" }}
            onClick={removeCartItemHandler}
          >
            Remove
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
            onClick={chooseToBuyHandler}
          >
            {!isChosen ? "Choose to buy" : "Unchoose"}
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="end" spacing={1}>
        <Typography variant="p" fontSize={19}>
          {currencyFormatter.format(item.category.price * item.quantity)}
        </Typography>
        <IncreDecre
          quantity={item.quantity}
          increment={incrementQuantityHandler}
          decrement={decrementQuantityHandler}
        />
      </Stack>
    </Stack>
  );
}

export default CartItem;
