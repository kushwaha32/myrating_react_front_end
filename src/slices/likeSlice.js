import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likes: localStorage.getItem("likes")
    ? JSON.parse(localStorage.getItem("likes"))
    : [],
};


const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload;
            localStorage.setItem("likes", JSON.stringify(action.payload))
        },
        updateLikes: (state, action) => {
            state.likes = action.payload;
            localStorage.setItem("likes", JSON.stringify(action.payload))
        }
    }
});

export const { setLikes, updateLikes } = likeSlice.actions;

export default likeSlice.reducer;