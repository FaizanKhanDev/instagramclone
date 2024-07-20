import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// It is used to define our endpoints and allow to create the API slice
export const authApi = createApi({
    // The unique key that defines where the Redux store will store our cache.
    reducerPath: 'authApi',

    // The base query to request data.
    // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.42.11:8000/api/v1/auth',
        // baseUrl: 'http://192.168.42.98:8000/api/v1/auth',
    }),

    // The set of operations that we want to perform against the server.
    endpoints: (builder) => ({

        /* ------- Create Account ------- */
        createAccount: builder.mutation({
            query: (data) => {
                return {
                    url: "/register",
                    method: 'POST',
                    body: data
                }
            }
        }),
        /* ------ verify Otp ------ */
        verifyOtp: builder.mutation({
            query: (data) => {
                return {
                    url: "/verified-email",
                    method: 'POST',
                    body: data
                }
            }
        }),


        /* ------- Login ------- */
        login: builder.mutation({
            query: (data) => {
                return {
                    url: "/login",
                    method: 'POST',
                    body: data
                }
            }
        }),


    }),

})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useCreateAccountMutation, useVerifyOtpMutation, useLoginMutation } = authApi