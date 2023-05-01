import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import {
    fetchCart,
    fetchCartData,
    getCartFromLS,
    saveCart,
    saveCartToLS
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

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (arg, thunkAPI) => {
    const response = await fetchCart()
    return response.data.data
})

export const saveCartItems = createAsyncThunk('cart/saveCartItems', async (cartItems, thunkAPI) => {
    const response = await saveCart(cartItems)
    return response.data.data
})

const initialState = {
    isCartPopupShow: false,
    cartItems: getCartFromLS(),
    totalPrice: 0,
    quantity: getCartFromLS().length,
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

            saveCartToLS(state.cartItems)
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

            saveCartToLS(state.cartItems)
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
            saveCartToLS(state.cartItems)
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
            saveCartToLS(state.cartItems)
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload
            console.log(state.cartItems)
            state.quantity = state.cartItems.length
            saveCartToLS(state.cartItems)
        })
        builder.addCase(saveCartItems.fulfilled, (state, actions) => {
            console.log('Cart saved to database!')
        })
    }
})

export default cartSlice.reducer

export const actions = cartSlice.actions