
import { apiSlice } from "./apiSlice";

const USER_PROFFESSION_URL = "/api/v1/userproffession";

export const userProffessionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProffession: builder.query({
            query: () => `${USER_PROFFESSION_URL}`
        })
    })
});


export const { useGetUserProffessionQuery } = userProffessionApiSlice