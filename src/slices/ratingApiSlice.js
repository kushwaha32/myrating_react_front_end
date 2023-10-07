import { apiSlice } from "./apiSlice";

const RATING_URL = "/api/v1";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRating: builder.mutation({
      query: (data) => ({
        url: `${RATING_URL}/product/${data?.product}/review`,
        method: "POST",
        body: data,
      }),
    }),
    getRatings: builder.mutation({
      query: (data) => ({
        url: `${RATING_URL}/product/${data?.productSlug}/review`,
        method: "GET",
      }),
    }),
    getFilteredRating: builder.mutation({
      query: (data) => ({
        url: `${RATING_URL}/review?${data.query}`,
        method: "GET",
      }),
    }),
    updateRating: builder.mutation({
      query: (data) => ({
        url: `${RATING_URL}/product/${data.product}/review/${data.reviewId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteRating: builder.mutation({
      query: (data) => ({
        url: `${RATING_URL}/product/${data.product._id}/review/${data._id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetRatingsMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useGetFilteredRatingMutation,
} = ratingApiSlice;
