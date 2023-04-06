import { createSlice } from "@reduxjs/toolkit";

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
            state.isLoggingIn = action.payload
        },
        signup(state) {
            state.isSigningUp = false
        }
    }
})

export const actions = authSlice.actions

export default authSlice.reducer