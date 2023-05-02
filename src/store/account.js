import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    isAccountPopupShow: false,
    isAddingLocation: false
}

const accountSlice = createSlice({
    name: 'Account',
    initialState,
    reducers: {
        hideAccountPopup(state) {
            state.isAccountPopupShow = false
        },
        showAccountPopup(state) {
            state.isAccountPopupShow = true
        }
    }
})

export default accountSlice.reducer

export const actions = accountSlice.actions