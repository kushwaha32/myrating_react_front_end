import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandProfile: localStorage.getItem("brandProfile")
    ? JSON.parse(localStorage.getItem("brandProfile"))
    : [],
};

const brandProfileSlice = createSlice({
  name: "brandProfile",
  initialState,
  reducers: {
    setBrandProfile: (state, action) => {
      state.brandProfile = action.payload;
      localStorage.setItem("brandProfile", JSON.stringify(action.payload));
    },
  },
});

export const { setBrandProfile } = brandProfileSlice.actions;

export default brandProfileSlice.reducer;
