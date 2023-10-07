import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avgRating: localStorage.getItem("avgRating")
    ? JSON.parse(localStorage.getItem("avgRating"))
    : [],
};

const avgRatingSlice = createSlice({
  name: "avgRating",
  initialState,
  reducers: {
    setAvgRating: (state, action) => {
      state.avgRating = action.payload;
      localStorage.setItem("avgRating", JSON.stringify(action.payload));
    },
  },
});

export const { setAvgRating } = avgRatingSlice.actions;

export default avgRatingSlice.reducer;
