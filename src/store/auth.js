import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isSignedUp: false,
    isLoggingIn: false,
    isSigningUp: false,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        openLogin(state) {
            state.isLoggingIn = true
        },
        closeLogin(state) {
            state.isLoggingIn = false
        },
        openSignup(state) {
            state.isSigningUp = true
        },
        closeSignup(state) {
            state.isSigningUp = false
        },
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
        },
        signup(state) {
            state.isSignedUp = true
            state.isAuthenticated = false
        }
    }
})

export const actions = authSlice.actions

export default authSlice.reducer