import {
    configureStore
} from "@reduxjs/toolkit";
import authReducer from "./auth"
import uiReducer from "./ui"
import cartReducer from "./cart"
import accountReducer from "./account"

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        cart: cartReducer,
        account: accountReducer
    }
})

export default store