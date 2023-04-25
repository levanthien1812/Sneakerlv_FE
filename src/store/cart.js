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
        }
    }
})

export default cartSlice.reducer

export const actions = createSlice.actions