import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandAvgRating: localStorage.getItem("brandAvgRating")
    ? JSON.parse(localStorage.getItem("brandAvgRating"))
    : [],
};

const brandAvgRatingSlice = createSlice({
  name: "brandAvgRating",
  initialState,
  reducers: {
    setBrandAvgRating: (state, action) => {
      state.brandAvgRating = action.payload;
      localStorage.setItem("brandAvgRating", JSON.stringify(action.payload));
    },
  },
});

export const { setBrandAvgRating } = brandAvgRatingSlice.actions;

export default brandAvgRatingSlice.reducer;
