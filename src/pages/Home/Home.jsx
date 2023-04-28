import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { actions as cartActions } from "../../store/cart";

export default function Home() {
//   const dispatch = useDispatch();
//   const cartItems = useLoaderData();

//   useEffect(() => {
//     dispatch(cartActions.setCartItems(cartItems));
//   }, []);

  return <div>Home</div>;
}
