import {
    POST_REQUEST,
POST_SUCCESS,
POST_FAILURE,
GET_POSTS,
GET_POSTS_SUCCESS,
GET_POSTS_FAILURE,
DELETE_POST,
DELETE_POST_SUCCESS,
CREATE_POST,
  } from './actionTypes';

  /* ------ Create ------ */
  export const createPost = () => ({
    type: CREATE_POST,
  });
  
 