
import { apiSlice } from "./apiSlice";


const S3_BUCKET_URL = "/api/v1";

export const s3BucketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getS3SecureUrl: builder.mutation({
            query: (data) => ({
                url: `${S3_BUCKET_URL}/s3bucktet`,
                method: "GET"
            })
        })
    })
})

export const {useGetS3SecureUrlMutation} = s3BucketApiSlice