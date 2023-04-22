import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    isModalShown: false,
    isNotifShown: false,
    notification: {
        title: 'Success!',
        message: '',
        type: 'success'
    }
}

const UISlide = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        showModal(state) {
            state.isModalShown = true
        },
        hideModal(state) {
            state.isModalShown = false
        },
        hideNotification(state) {
            state.isNotifShown = false
            state.notification = initialUIState.notification
        },
        showNotification(state, action) {
            state.isNotifShown = true
            state.notification = action.payload
        }
    }
})

export const actions = UISlide.actions
export default UISlide.reducer