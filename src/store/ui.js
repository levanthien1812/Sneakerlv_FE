import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    isModalShown: false,
    isNotifShown: false
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
        showNotification(state) {
            state.isNotifShown = true
        },
        hideNotification(state) {
            state.isNotifShown = false
        },
    }
})

export const actions = UISlide.actions
export default UISlide.reducer