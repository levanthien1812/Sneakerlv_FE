import { createSlice, isAllOf } from "@reduxjs/toolkit";
import { getAuthToken, isAuthened } from "../utils/auth";

const initialAuthState = {
    isSignedUp: false,
    isLoggingIn: false,
    isSigningUp: false,
    isAuthenticated: isAuthened()
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsLoggingIn(state, action) {
            state.isLoggingIn = action.payload
        },
        setIsSigningUp(state, action) {
            state.isLoggingIn = action.payload
        },
        signup(state) {
            state.isSigningUp = false
        },
        setAuth(state) {
            const token = getAuthToken()
            if (token === 'EXPIRED' || token === null)
                state.isAuthenticated = false
            else state.isAuthenticated = true
        }
    }
})

export const actions = authSlice.actions

export default authSlice.reducer