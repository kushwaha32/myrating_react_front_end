import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratingDistribution: localStorage.getItem("ratingDistribution")
    ? JSON.parse(localStorage.getItem("ratingDistribution"))
    : [],
};

const ratingDistributionSlice = createSlice({
  name: "ratingDistribution",
  initialState,
  reducers: {
    setRatingDistribution: (state, action) => {
      state.ratingDistribution = action.payload;
      localStorage.setItem(
        "ratingDistribution",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setRatingDistribution } = ratingDistributionSlice.actions;

export default ratingDistributionSlice.reducer;
