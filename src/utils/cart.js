import axios from "axios";

export const saveCart = async (cartItems) => {
  console.log(cartItems)
  return axios.post("http://localhost:3000/api/carts", {
    cartItems
  }, {
    withCredentials: true,
    credentials: 'include'
  })
}

export const fetchCart = () => {
  return axios.get("http://localhost:3000/api/carts", {
    withCredentials: true,
    credentials: 'include'
  })
}

// export const fetchCartData = async () => {
//   const response = await fetchCart()
//   return response.data.data
// }

export const getCartFromLS = () => {
  return JSON.parse(localStorage.getItem('cartItems'))
}

export const saveCartToLS = (cartItems) => {
  console.log(cartItems)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}