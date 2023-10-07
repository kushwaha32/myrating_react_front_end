import { apiSlice } from "./apiSlice";

const URL = "/api/v1/brandProfile";

export const brandProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandProfile: builder.mutation({
      query: (data) => `${URL}/user/${data.userId}`,
      method: "GET",
    }),
    getBrandProfileFromSlug: builder.mutation({
      query: (data) => `${URL}/${data.brandSlug}`,
      method: "GET",
    }),
  }),
});

export const {
  useGetBrandProfileMutation,
  useGetBrandProfileFromSlugMutation,
} = brandProfileApiSlice;
