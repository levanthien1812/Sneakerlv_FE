import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    isModalShown: false,
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
        }
    }
})

export const actions = UISlide.actions
export default UISlide.reducer