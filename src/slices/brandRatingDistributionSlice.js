import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandRatingDistribution: localStorage.getItem("brandRatingDistribution")
    ? JSON.parse(localStorage.getItem("brandRatingDistribution"))
    : [],
};

const brandRatingDistributionSlice = createSlice({
  name: "brandRatingDistribution",
  initialState,
  reducers: {
    setBrandRatingDistribution: (state, action) => {
      state.brandRatingDistribution = action.payload;
      localStorage.setItem(
        "brandRatingDistribution",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setBrandRatingDistribution } =
  brandRatingDistributionSlice.actions;

export default brandRatingDistributionSlice.reducer;
