import { apiSlice } from "./apiSlice";

const URL = "/api/v1/industry";

export const brandIndustryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandIndustry: builder.query({
      query: () => `${URL}`,
    }),
  }),
});

export const { useGetBrandIndustryQuery } = brandIndustryApiSlice;
