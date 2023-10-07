import { apiSlice } from "./apiSlice";

const RDISTRIBUTION_URL = "/api/v1";

export const ratingDistributionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRatingDistribution: builder.mutation({
      query: (data) => ({
        url: `${RDISTRIBUTION_URL}/product/${data.productSlug}/review/rDistribution`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRatingDistributionMutation } = ratingDistributionApiSlice;
