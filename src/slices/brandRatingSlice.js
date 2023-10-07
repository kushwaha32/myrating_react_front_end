import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandRatings: localStorage?.getItem("brandRatings")
    ? JSON.parse(localStorage?.getItem("brandRatings"))
    : [],
};

const brandRatingSlice = createSlice({
  name: "brandRatings",
  initialState,
  reducers: {
    setBrandRatings: (state, action) => {
      state.brandRatings = action.payload;
      localStorage.setItem("brandRatings", JSON.stringify(action.payload));
    },
    updateBrandRatings: (state, action) => {
      state.brandRatings = action.payload;
      localStorage.setItem("brandRatings", JSON.stringify(action.payload));
    },
  },
});

export const { setBrandRatings, updateRatings } = brandRatingSlice.actions;

export default brandRatingSlice.reducer;
