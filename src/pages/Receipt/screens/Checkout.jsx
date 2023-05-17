import React from "react";
import { useLocation } from "react-router";

function Checkout() {
  const { state } = useLocation();
  if (state) console.log(state.chosenCartItems);
  return <div>Checkout</div>;
}

export default Checkout;
