import {
    POST_REQUEST,
POST_SUCCESS,
POST_FAILURE,
GET_ALL_POSTS,
GET_POSTS_SUCCESS,
GET_POSTS_FAILURE,
DELETE_POST,
DELETE_POST_SUCCESS,
CREATE_POST,
  } from './actionTypes';

  /* ------ Create ------ */
  export const createPosts = (data) => ({
    type: CREATE_POST,
    payload: data
  });


  export const postRequest = () => ({
    type: POST_REQUEST,
  });
  
  export const postSuccess = (post) => ({
    type: POST_SUCCESS,
    payload: post,
  });
  
  export const postFailure = (error) => ({
    type: POST_FAILURE,
    payload: error,
  });
  
  /* ------ Get Posts ------ */
  export const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload:posts
  });
  
  export const getPostsSuccess = (posts) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
  });
  
  export const getPostsFailure = (error) => ({
    type: GET_POSTS_FAILURE,
    payload: error,
  });
  
  /* ------ Delete Post ------ */
  export const deletePost = () => ({
    type: DELETE_POST,
  });
  
  export const deletePostSuccess = (post) => ({
    type: DELETE_POST_SUCCESS,
    payload: post,
  });
  
 