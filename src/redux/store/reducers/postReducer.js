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
} from '../actions/actionTypes';



const initialState = {
    error: null,
};



// Reducer function
const postReducer = (state = initialState, action) => {
    switch (action.type) {

        /* ------ Create Post ------ */
        case CREATE_POST:
            return {
                ...state,
                error: null,
            };


    }
};

export default postReducer;
