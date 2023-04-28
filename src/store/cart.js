import {
    createSlice
} from "@reduxjs/toolkit";
import {
    json
} from "react-router";
import {
    getCartItemsFromLS, setCartItemsToLS
} from "../utils/cart";

const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0
    cartItems.map(cartItem => {
        if (cartItem.isChosen) {
            totalPrice += cartItem.price
        }
    })

    return totalPrice
}

const initialState = {
    isCartPopupShow: false,
    cartItems: getCartItemsFromLS(),
    totalPrice: 0,
    quantity: getCartItemsFromLS().length,
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemToAdd = action.payload
            const index = state.cartItems.findIndex(
                item =>
                item.sneaker._id === itemToAdd.sneaker._id &&
                item.category._id === itemToAdd.category._id
            )
            if (index > -1) {
                const cartItem = state.cartItems[index]
                cartItem.quantity += itemToAdd.quantity
                cartItem.price = cartItem.quantity * cartItem.category.price
                state.cartItems[index] = cartItem
            } else {
                state.cartItems.push(itemToAdd)
            }

            state.quantity = state.cartItems.length
            state.totalPrice = calculateTotalPrice(state.cartItems)
            // manipulate localStorage
            setCartItemsToLS(state.cartItems)
        },

        removeFromCart(state, action) {
            const itemToRemove = action.payload
            const index = state.cartItems.findIndex(
                item =>
                item.sneaker._id === itemToRemove.sneaker._id &&
                item.category._id === itemToRemove.category._id
            )
            state.cartItems.splice(index, 1)

            state.quantity = state.cartItems.length
            state.totalPrice = calculateTotalPrice(state.cartItems)
            // manipulate localStorage
            setCartItemsToLS(state.cartItems)
        },
        showCartPopup(state) {
            state.isCartPopupShow = true
        },
        hideCartPopup(state) {
            state.isCartPopupShow = false
        },
        increQuantity(state, action) {
            const id = action.payload
            const index = state.cartItems.findIndex(item => item._id === id)
            const cartItem = state.cartItems[index]
            cartItem.quantity++
            cartItem.price = cartItem.quantity * cartItem.category.price

            state.totalPrice = calculateTotalPrice(state.cartItems)
            setCartItemsToLS(state.cartItems)
        },

        decreQuantity(state, action) {
            const id = action.payload
            const index = state.cartItems.findIndex(item => item._id === id)
            const cartItem = state.cartItems[index]

            if (cartItem.quantity === 1) {
                cartItem.quantity = 1
            } else cartItem.quantity--
            cartItem.price = cartItem.quantity * cartItem.category.price

            state.totalPrice = calculateTotalPrice(state.cartItems)
            setCartItemsToLS(state.cartItems)
        },
        getCartItems(state) {
            state.cartItems = getCartItemsFromLS()
            state.quantity = state.cartItems.length
        },
        setChosen(state, action) {
            const {
                id,
                isChosen
            } = action.payload
            const index = state.cartItems.findIndex(item => item._id === id)
            const cartItem = state.cartItems[index]
            cartItem.isChosen = isChosen

            state.totalPrice = calculateTotalPrice(state.cartItems)
        },
    }
})

export default cartSlice.reducer

export const actions = cartSlice.actions