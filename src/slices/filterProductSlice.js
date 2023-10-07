import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: localStorage.getItem("filterProducts")
    ? JSON.parse(localStorage.getItem("filterProducts"))
    : [],
};

const filterProductSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    setFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
      localStorage.setItem("filterProducts", JSON.stringify(action.payload));
    },
    updateFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
      localStorage.setItem("filterProducts", JSON.stringify(action.payload));
    },
  },
});

export const { setFilterProducts, updateFilterProducts } =
  filterProductSlice.actions;

export default filterProductSlice.reducer;
