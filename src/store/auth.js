import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isSignedUp: false,
    isAuthenticating: false,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
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