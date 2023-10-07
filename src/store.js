import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import filterProductsReducer from "./slices/filterProductSlice";
import ratingReducer from "./slices/ratingSlice";
import likeReducer from "./slices/likeSlice";
import { apiSlice } from "./slices/apiSlice";
import topBrandReducer from "./slices/topBrandSlice";
import categoriesReducer from "./slices/categorySlice";
import avgRatingReducer from "./slices/avgRatingSlice";
import ratingDistributionReducer from "./slices/ratingDistributionSlice";
import brandProfileReducer from "./slices/brandProfileSlice";
import brandRatingReducer from "./slices/brandRatingSlice";
import brandAvgRatingReducer from "./slices/brandAvgRatingSlice";
import brandRatingDistributionReducer from "./slices/brandRatingDistributionSlice";
import brandLikeReducer from "./slices/brandLikeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    filterProducts: filterProductsReducer,
    ratings: ratingReducer,
    brandRatings: brandRatingReducer,
    likes: likeReducer,
    brandLikes: brandLikeReducer,
    topBrands: topBrandReducer,
    categories: categoriesReducer,
    avgRating: avgRatingReducer,
    ratingDistribution: ratingDistributionReducer,
    bradProfile: brandProfileReducer,
    brandAvgRating: brandAvgRatingReducer,
    brandRatingDistribution: brandRatingDistributionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
