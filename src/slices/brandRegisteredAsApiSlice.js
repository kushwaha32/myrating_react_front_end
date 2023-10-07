import { apiSlice } from "./apiSlice";

const URL = "/api/v1/registeredAs";

export const registeredAsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegisteredAs: builder.query({
      query: () => `${URL}`,
    }),
  }),
});

export const { useGetRegisteredAsQuery } = registeredAsApiSlice;
