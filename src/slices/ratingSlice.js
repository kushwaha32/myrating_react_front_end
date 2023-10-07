import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: localStorage?.getItem("ratings")
    ? JSON.parse(localStorage?.getItem("ratings"))
    : [],
};

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload;
      localStorage.setItem("ratings", JSON.stringify(action.payload));
    },
    updateRatings: (state, action) => {
      state.ratings = action.payload;
      localStorage.setItem("ratings", JSON.stringify(action.payload));
    },
  },
});

export const { setRatings, updateRatings } = ratingSlice.actions;

export default ratingSlice.reducer;
