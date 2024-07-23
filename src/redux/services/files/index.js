import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// RTK

// It is used to define our endpoints and allow to create the API slice
export const filesApi = createApi({
    // The unique key that defines where the Redux store will store our cache.
    reducerPath: 'filesApi',

    // The base query to request data.
    // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.42.11:5000/api/v1/buckets',


    }),

    // The set of operations that we want to perform against the server.
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (data) => {
                return {
                    url: "/upload-file",
                    method: 'POST',
                    body: data,
                }
            }
        }),
    }),

})


// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useUploadFileMutation } = filesApi