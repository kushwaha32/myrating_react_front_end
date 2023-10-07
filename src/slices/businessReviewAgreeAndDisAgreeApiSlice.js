import { apiSlice } from "./apiSlice";

const REVIEW_AGREE_DISAGREE_URL = "/api/v1";

export const businessReviewAgreeDisApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBuisnessAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/businessReviewAgree`,
        method: "POST",
        body: data,
      }),
    }),
    createBusinessDisAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/businessReviewDisAgree`,
        method: "POST",
        body: data,
      }),
    }),
    getBusinessReviewAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/brandReview/${data.reviewId}/businessReviewAgree`,
        method: "GET",
      }),
    }),

    getBusinessReviewDisAgree: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_AGREE_DISAGREE_URL}/brandReview/${data.reviewId}/businessReviewDisAgree`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBuisnessAgreeMutation,
  useCreateBusinessDisAgreeMutation,
  useGetBusinessReviewAgreeMutation,
  useGetBusinessReviewDisAgreeMutation,
} = businessReviewAgreeDisApiSlice;
