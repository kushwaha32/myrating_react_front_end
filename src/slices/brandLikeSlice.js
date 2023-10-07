import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandLikes: localStorage.getItem("brandLikes")
    ? JSON.parse(localStorage.getItem("brandLikes"))
    : [],
};

const brandLikeSlice = createSlice({
  name: "brandLikes",
  initialState,
  reducers: {
    setBrandLikes: (state, action) => {
      state.brandLikes = action.payload;
      localStorage.setItem("brandLikes", JSON.stringify(action.payload));
    },
    updateBrandLikes: (state, action) => {
      state.brandLikes = action.payload;
      localStorage.setItem("brandLikes", JSON.stringify(action.payload));
    },
  },
});

export const { setBrandLikes, updateBrandLikes } = brandLikeSlice.actions;

export default brandLikeSlice.reducer;
