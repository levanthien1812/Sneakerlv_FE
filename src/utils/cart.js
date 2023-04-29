import axios from "axios";
import { json } from "react-router";

export const fetchCartItems = async () => {
  const resonse = await fetch("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: "include",
  });

  if (!resonse.ok) {
    throw json({
      message: "Error when loading cart items!"
    }, {
      status: 500
    });
  }

  const {
    data
  } = await resonse.json();
  return data;
};

export const saveCartItems = async (cartItems) => {
  console.log('1')
  const resonse = await fetch("http://localhost:3000/api/carts", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems),
    withCredentials: true,
    credentials: "include",
  });


  if (!resonse.ok) {
    throw json({
      message: "Error when saving cart items!"
    }, {
      status: 500
    });
  }
  console.log('Save cart to db successfully')
}

export const fetchCartItems2 = () => {
  return axios.get("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: 'include'
  })
}