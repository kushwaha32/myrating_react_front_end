import { apiSlice } from "./apiSlice";

const BRDISTRIBUTION_URL = "api/v1";

export const brandRatingDistributionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandRatingDistribution: builder.mutation({
      query: (data) => ({
        url: `${BRDISTRIBUTION_URL}/brandProfile/${data.brandSlug}/brandReview/rDistribution`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandRatingDistributionMutation } =
  brandRatingDistributionApiSlice;
