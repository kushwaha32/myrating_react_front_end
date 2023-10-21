import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:4000",
  // baseUrl: "https://api.myratings.in",
  credentials: "include",
  prepareHeaders: (Headers, { getState }) => {
    const token = getState().auth?.userInfo?.token;
    if (token) {
      Headers.set("authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
