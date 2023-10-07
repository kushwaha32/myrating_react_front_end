import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/v1";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    categoryIfHasProducts: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/industrySubCat/hasProduct`,
        method: "GET",
      }),
    }),
    categoryIfHasProductsBySlug: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/industrySubCat/public/hasProduct`,
        method: "GET",
        params: {
          slug: data.slug,
        },
      }),
    }),
    categoryProducts: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/industrySubCat/category/${data.slug}`,
        method: "GET",
      }),
    }),
    categoryProductsForPblic: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/industrySubCat/category/public/${data.slug}`,
        method: "GET",
        params: {
          brand_slug: data.brand_slug,
        },
      }),
    }),
  }),
});

export const {
  useCategoryIfHasProductsMutation,
  useCategoryIfHasProductsBySlugMutation,
  useCategoryProductsMutation,
  useCategoryProductsForPblicMutation,
} = categoryApiSlice;
