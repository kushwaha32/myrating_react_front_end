import { apiSlice } from "./apiSlice";

const AVG_RATING_URL = "/api/v1";

export const avgRatingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvgRating: builder.mutation({
      query: (data) => ({
        url: `${AVG_RATING_URL}/product/${data.productSlug}/review/avgRating`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAvgRatingMutation } = avgRatingApiSlice;
