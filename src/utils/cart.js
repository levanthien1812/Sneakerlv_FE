// export const fetchCartData = async () => {
//   const response = await fetchCart()
//   return response.data.data
// }

export const getCartFromLS = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};

export const saveCartToLS = (cartItems) => {
  // console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
