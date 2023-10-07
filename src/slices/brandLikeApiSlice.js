import { apiSlice } from "./apiSlice";

const LIKE_URL = "/api/v1";

export const brandLikeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandLikes: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/brandProfile/${data?.brandProfile}/brandLike`,
        method: "GET",
      }),
    }),
    createBrandLike: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/brandProfile/${data?.brandProfile}/brandLike`,
        method: "POST",
      }),
    }),
    deleteBrandLike: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/brandProfile/${data?.brandProfile}/brandLike`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBrandLikesMutation,
  useCreateBrandLikeMutation,
  useDeleteBrandLikeMutation,
} = brandLikeApiSlice;
