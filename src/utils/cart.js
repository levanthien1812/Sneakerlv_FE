export const fetchCartItems = async () => {
  const resonse = await fetch("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: "include",
  });

  if (!resonse.ok) {
    throw json({ message: "Error when loading cart items!" }, { status: 500 });
  }

  const { data } = await resonse.json();
  return data;
};

export const getCartItemsFromLS = () => {
    return JSON.parse(localStorage.getItem("cartItems")) || []
}

export const setCartItemsToLS = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}