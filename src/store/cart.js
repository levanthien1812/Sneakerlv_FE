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
            // manipulate localStorage
        },
        removeFromCart(state, action) {
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
            const cartItems = state.cartItems
            const index = cartItems.findIndex(item => item._id === id)
            cartItems[index].quantity++
            cartItems[index].price = cartItems[index].quantity * cartItems[index].category.price

            state.cartItems = cartItems
            console.log(cartItems)
        },
        
        decreQuantity(state, action) {
            const id = action.payload
            const index = state.cartItems.findIndex(item => item._id === id)
            if (state.cartItems[index].quantity === 1) {
                state.cartItems[index].quantity = 1
            } else state.cartItems[index].quantity--
            state.cartItems[index].price = state.cartItems[index].quantity * state.cartItems[index].category.price
        },
        setCartItems(state, action) {
            state.cartItems = action.payload
            state.quantity = state.cartItems.length
        }
    }
})

export default cartSlice.reducer

export const actions = cartSlice.actions