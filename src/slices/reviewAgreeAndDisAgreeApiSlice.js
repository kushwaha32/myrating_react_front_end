import { apiSlice } from "./apiSlice";

const REVIEW_AGREE_DISAGREE_URL = "/api/v1";

export const reviewAgreeDisApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/reviewAgree`,
        method: "POST",
        body: data,
      }),
    }),
    createDisAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/reviewDisAgree`,
        method: "POST",
        body: data,
      }),
    }),
    getReviewAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/review/${data.reviewId}/reviewAgree`,
        method: "GET",
      }),
    }),
    
    getReviewDisAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/review/${data.reviewId}/reviewDisAgree`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAgreeMutation,
  useCreateDisAgreeMutation,
  useGetReviewAgreeMutation,
  useGetReviewDisAgreeMutation,
} = reviewAgreeDisApiSlice;
