import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAddresses } from "../services";

export const _fetchAddresses = createAsyncThunk(
  "account/fetchAddresses",
  async (arg, thunkAPI) => {
    const addresses = await fetchAddresses();
    return addresses;
  }
);

// export const saveCartItems = createAsyncThunk(
//   "cart/saveCartItems",
//   async (cartItems, thunkAPI) => {
//     const response = await saveCart(cartItems);
//     return response.data.data;
//   }
// );

const initialState = {
  isAccountPopupShow: false,
  isAddingAddress: false,
  addresses: [],
};

const accountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    hideAccountPopup(state) {
      state.isAccountPopupShow = false;
    },
    showAccountPopup(state) {
      state.isAccountPopupShow = true;
    },
    setIsAddingAddress(state, action) {
      state.isAddingAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(_fetchAddresses.fulfilled, (state, action) => {
      console.log(action.payload);
      state.addresses = action.payload;
    });
  },
});

export default accountSlice.reducer;

export const actions = accountSlice.actions;
