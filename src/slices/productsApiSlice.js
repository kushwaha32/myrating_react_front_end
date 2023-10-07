import { apiSlice } from "./apiSlice";

const PRODUCT_URL = "/api/v1";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product`,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    businessProductBasedCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product?categorySlug=${data.categorySlug}&user=${data.user}&page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),
    getProductBasedCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product?subCategorySlug=${data.catSlug}`,
        method: "GET",
      }),
    }),
    getAllProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product`,
        method: "GET",
      }),
    }),
    getProductBasedSlug: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product/${data.productSlug}`,
        method: "GET",
      }),
    }),
    getFavouritesProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/like/user`,
        method: "GET",
        params: {
          userId: data.userId,
        },
      }),
    }),
    getProductsBasedOnBrand: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/BrandProduct`,
        method: "GET",
        params: {
          user: data.brand_id,
        },
      })
    }),
    getProductsBasedOnBrandSlug: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/BrandProduct`,
        method: "GET",
        params: {
          slug: data.slug,
        },
      })
    }),
    getFilteredProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/product?${data.query}`,
        method: "GET"
      })
    }),
    getFilteredProductsWithBrand: builder.mutation({
        query: (data) => ({
          url: `${PRODUCT_URL}/product`,
          method: "GET",
          params: data
        })
    })
  }),
});

export const {
  useCreateProductMutation,
  useBusinessProductBasedCategoryMutation,
  useUpdateProductMutation,
  useGetFavouritesProductsMutation,
  useGetProductBasedCategoryMutation,
  useGetAllProductsMutation,
  useGetProductBasedSlugMutation,
  useGetProductsBasedOnBrandMutation,
  useGetFilteredProductsMutation,
  useGetFilteredProductsWithBrandMutation,
  useGetProductsBasedOnBrandSlugMutation
 
} = productsApiSlice;
