import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
  },
});


export const { setProducts, updateProducts } = productSlice.actions;


export default productSlice.reducer;