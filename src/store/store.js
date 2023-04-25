import {
    configureStore
} from "@reduxjs/toolkit";
import authReducer from "./auth"
import uiReducer from "./ui"
import cartReducer from "./cart"

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        cart: cartReducer
    }
})

export default store