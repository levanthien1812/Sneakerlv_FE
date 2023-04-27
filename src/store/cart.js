import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    isCartPopupShow: false,
    cartItems: [],
    totalPrice: 0,
    quantity: 0,
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
            // manipulate localStorage
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
            // manipulate localStorage
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

            state.cartItems[index] = cartItem
        },

        decreQuantity(state, action) {
            const id = action.payload
            const index = state.cartItems.findIndex(item => item._id === id)
            const cartItem = state.cartItems[index]

            if (cartItem.quantity === 1) {
                cartItem.quantity = 1
            } else cartItem.quantity--
            cartItem.price = cartItem.quantity * cartItem.category.price
        },
        setCartItems(state, action) {
            state.cartItems = action.payload
            state.quantity = state.cartItems.length
        }
    }
})

export default cartSlice.reducer

export const actions = cartSlice.actions