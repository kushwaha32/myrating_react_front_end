import { apiSlice } from "./apiSlice";

const CITY_URL_HISTORY = "/api/v1";

export const searchCityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCity: builder.mutation({
            query: (data) => ({
                url: `${CITY_URL_HISTORY}/searchCity`,
                method: "GET"
            })
        })
    })
})

export const {useGetCityMutation} = searchCityApiSlice;