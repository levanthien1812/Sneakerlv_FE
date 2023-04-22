import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, isAuthened, logout } from "../utils/auth";

const initialAuthState = {
    isSignedUp: false,
    isLoggingIn: false,
    isSigningUp: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsLoggingIn(state, action) {
            state.isLoggingIn = action.payload
        },
        setIsSigningUp(state, action) {
            state.isSigningUp = action.payload
        },
        signup(state) {
            state.isSigningUp = false
            state.isLoggingIn = true
        },
        logout(state) {
            logout()
        },
    }
})

export const actions = authSlice.actions

export default authSlice.reducer