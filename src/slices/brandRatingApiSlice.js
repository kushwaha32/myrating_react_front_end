import { apiSlice } from "./apiSlice";

const BRAND_RATING_URL = "/api/v1";

export const brandRatingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrandRating: builder.mutation({
      query: (data) => ({
        url: `${BRAND_RATING_URL}/brandProfile/${data?.brandProfile}/brandReview`,
        method: "POST",
        body: data,
      }),
    }),
    updateBrandRating: builder.mutation({
      query: (data) => ({
        url: `${BRAND_RATING_URL}/brandReview/${data.currentBrand}`,
        method: "PATCH",
        body: data,
      }),
    }),
    removeBrandRating: builder.mutation({
      query: (data) => ({
        url: `${BRAND_RATING_URL}/brandReview/${data._id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    getFilteredBrandRating: builder.mutation({
      query: (data) => ({
        url: `${BRAND_RATING_URL}/brandReview?${data.query}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBrandRatingMutation,
  useUpdateBrandRatingMutation,
  useRemoveBrandRatingMutation,
  useGetFilteredBrandRatingMutation,
} = brandRatingApiSlice;
