import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topBrands: localStorage.getItem("topBrands")
    ? JSON.parse(localStorage.getItem("topBrands"))
    : [],
};

const topBrandSlice = createSlice({
  name: "topBrands",
  initialState,
  reducers: {
    setTopBrands: (state, action) => {
      state.topBrands = action.payload;
      localStorage.setItem("topBrands", JSON.stringify(action.payload));
    },
    updateTopBrands: (state, action) => {
      state.topBrands = action.payload;
      localStorage.setItem("topBrands", JSON.stringify(action.payload));
    },
  },
});

export const { setTopBrands, updateTopBrands } = topBrandSlice.actions;

export default topBrandSlice.reducer;
