import { apiSlice } from "./apiSlice";

const TOP_BRAND_URL = "/api/v1";

export const topBrandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopBrand: builder.mutation({
      query: (data) => ({
        url: `${TOP_BRAND_URL}/topBrand`,
        method: "GET",
      }),
    }),
    getSingleBrand: builder.mutation({
      query: (data) => ({
       url: `${TOP_BRAND_URL}/brandProfile/${data.brandSlug}`,
       method: "GET"
      })
    })
  }),
});

export const { useGetTopBrandMutation, useGetSingleBrandMutation } = topBrandsApiSlice;
