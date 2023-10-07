import { apiSlice } from "./apiSlice";

const LIKE_URL = "/api/v1";

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLikes: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/product/${data?.product}/like`,
        method: "GET",
      }),
    }),
    createLike: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/product/${data?.product}/like`,
        method: "POST",
      }),
    }),
    deleteLike: builder.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/product/${data?.product}/like`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation, useGetLikesMutation } = likeApiSlice;
