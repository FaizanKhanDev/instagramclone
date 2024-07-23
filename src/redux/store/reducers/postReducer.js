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
} from '../actions/actionTypes';



const initialState = {
    error: null,
    posts:[]
};



// Reducer function
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        /* ------ Create Post ------ */
            case CREATE_POST:
                return {
                  ...state,
                  isAuthenticated: true,
                  user: action.payload,
                  error: null,
                };
            case CREATE_POST:
                return {
                  ...state,
                  isAuthenticated: false,
                  user: null,
                  error: action.payload,
                };
        /* ------ GET ALL Post ------ */
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state;
    }
};

export default postReducer;
