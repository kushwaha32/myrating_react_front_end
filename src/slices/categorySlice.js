import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : [],
};


const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            localStorage.setItem("categories", JSON.stringify(action.payload));
        },
        updateCategories: (state, action) => {
            state.categories = action.payload;
            localStorage.setItem("categories", JSON.stringify(action.payload));
        }
    }
})

export const { setCategories, updateCategories } = categorySlice.actions;

export default categorySlice.reducer;