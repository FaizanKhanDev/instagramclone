import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// It is used to define our endpoints and allow to create the API slice
export const postApi = createApi({
    // The unique key that defines where the Redux store will store our cache.
    reducerPath: 'postApi',

    // The base query to request data.
    // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.39:8000/api/v1/post',

    }),

    // The set of operations that we want to perform against the server.
    endpoints: (builder) => ({

        /* ===== Create New ====*/
        createPost: builder.mutation({
            query: (newPost) => {
                console.log("Create Post: ", newPost)
                return {
                    url: "/create",
                    method: 'POST',
                    body: newPost,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${newPost.token}`
                    }
                }
            }
        }),


        /* ===== Get All Post ====*/
        getAllPost: builder.mutation({
            query: (data) => ({
                url: `/all?type=${data.type}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                }
            })
        }),

        /* ===== Get Post By Id ====*/
        getPostById: builder.mutation({
            query: (data) => {
                return {
                    url: `/get/?id=${data.id}`,
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                }
            }
        }),


        /* ===== Get Post By Limit ====*/
        getPostByLimit: builder.query({
            query: (num) => {
                console.log("Limit Number:", num)
                return {
                    url: `posts?_limit=${num}`,
                    method: 'GET'
                }
            }
        }),


        /* ===== Delete Post ====*/
        deletePost: builder.mutation({
            query: (id) => {
                console.log("Delete ID:", id)
                return {
                    url: `/delete/${id}`,
                    method: 'DELETE'
                }
            }
        }),

        /* ===== Update Post ====*/
        updatePost: builder.mutation({
            query: (updatePostData) => {
                console.log("Update Post: ", updatePostData)
                const { id, ...data } = updatePostData
                console.log("Actual Update Post: ", data)
                return {
                    url: `/update/${id}`,
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: data,
                }
            }
        }),


        likePost: builder.mutation({
            query: (data) => {
                return {
                    url: `/like?id=${data.postId}&type=${data.key}`,
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                    body: data
                }
            }
        }),

        commentPost: builder.mutation({
            query: (data) => {
                return {
                    url: `/comment?id=${data.postId}`,
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                    body: data
                }
            }
        })

    }),


})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
    useGetAllPostMutation,
    useGetPostByIdMutation,
    useGetPostByLimitQuery,
    useDeletePostMutation,
    useCreatePostMutation,
    useUpdatePostMutation,
    useLikePostMutation,
    useCommentPostMutation
} = postApi