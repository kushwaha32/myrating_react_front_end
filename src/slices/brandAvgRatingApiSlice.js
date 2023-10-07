import { apiSlice } from "./apiSlice";

const AVG_RATING_URL = "/api/v1";

export const brandAvgRatingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandAvgRating: builder.mutation({
      query: (data) => ({
        url: `${AVG_RATING_URL}/brandProfile/${data.brandSlug}/brandReview/avgRating`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandAvgRatingMutation } = brandAvgRatingApiSlice;
