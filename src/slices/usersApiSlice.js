import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/v1";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/login`,
        method: "POST",
        body: data,
      }),
    }),
    signupOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/signUpViaOtp`,
        method: "POST",
        body: data,
      }),
    }),
    signupOtpVerify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/otpVerify`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/user/logout`,
        method: "POST",
      }),
    }),
    getUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    createUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "POST",
        body: data,
      }),
    }),
    createUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/createUserPassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/updateMyPassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    brandSignup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/brandSignup`,
        method: "POST",
        body: data,
      }),
    }),
    brandSignupOtpVerify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/brandSignUPOtpVerify`,
        method: "POST",
        body: data,
      }),
    }),
    resendOtpToContact: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/reSendOtpToContact`,
        method: "POST",
        body: data,
      }),
    }),
    resendOtpToEmail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/reSendOtpToEmail`,
        method: "POST",
        body: data,
      }),
    }),
    brandCreatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/brandCreatePass`,
        method: "PATCH",
        body: data,
      }),
    }),
    loginViaOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/loginWithOtp`,
        method: "POST",
        body: data,
      }),
    }),
    loginViaOtpVerify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/loginOtpVerify`,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    forgetPasswordOtpVerify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/validateForgetPasswordOtp`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/resetPassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateBrandProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/brandProfile/${data.id}}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateBrandContactInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserProfileInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/update-profile-image`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateUserDocumentId: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/update-document-id`,
        method: "PATCH",
        body: data,
      }),
    }),

    /////////////////////////////////////////////////////
    /////////////--- Update Profile Privacy ---/////////
    ///////////////////////////////////////////////////
    updateUserProfilePrivacy: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/update-profile-privacy`,
        method: "PATCH",
        body: data,
      }),
    }),

    /////////////////////////////////////////////////////
    /////////////--- Update Brand industry ---//////////
    ///////////////////////////////////////////////////
    updateBrandIndustry: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/brandProfile/update/brand-industry`,
        method: "PATCH",
        body: data,
      }),
    }),
    //////////////////////////////////////////////////////////
    /////////////--- Update Brand Location Info ---//////////
    ////////////////////////////////////////////////////////
    updateBrandLocation: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/brandProfile/update/location-information`,
        method: "PATCH",
        body: data,
      }),
    }),
    //////////////////////////////////////////////////////////
    /////////////--- Update contact Info ---//////////
    ////////////////////////////////////////////////////////
    updateBrandConnectInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/brandProfile/update/contact-information`,
        method: "PATCH",
        body: data,
      }),
    }),

    ////////////////////////////////////////////////////////////////////
    /////////////--- Check user allready created password ---//////////
    //////////////////////////////////////////////////////////////////
    checkUserCreatedPass: builder.query({
      query: () => `${USERS_URL}/user/check_has_password`,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupOtpMutation,
  useLogoutMutation,
  useSignupOtpVerifyMutation,
  useCreateUserProfileMutation,
  useCreateUserPasswordMutation,
  useBrandSignupMutation,
  useBrandSignupOtpVerifyMutation,
  useResendOtpToContactMutation,
  useResendOtpToEmailMutation,
  useBrandCreatePasswordMutation,
  useLoginViaOtpMutation,
  useLoginViaOtpVerifyMutation,
  useForgetPasswordMutation,
  useForgetPasswordOtpVerifyMutation,
  useResetPasswordMutation,
  useUpdateBrandProfileMutation,
  useUpdateBrandContactInfoMutation,
  useUpdateUserProfileInfoMutation,
  useUpdateUserProfileImageMutation,
  useUpdateUserDocumentIdMutation,
  useUpdateBrandIndustryMutation,
  useUpdateBrandLocationMutation,
  useGetUserProfileMutation,
  useUpdateUserProfilePrivacyMutation,
  useCheckUserCreatedPassQuery,
  useUpdateUserPasswordMutation,
  useUpdateBrandConnectInfoMutation,
} = usersApiSlice;
