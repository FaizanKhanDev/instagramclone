import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  SET_TOKEN,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';



const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  token: null
};



// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {

    /* ------ Login ------ */
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    /* ------ SET TOKEN ------ */
    case SET_TOKEN:
      try {
        if (action.payload !== undefined && action.payload !== null) {
          AsyncStorage.setItem('token', action.payload);
        } else {
          AsyncStorage.removeItem('token');
        }
      } catch (error) {
        console.log(error);
      }
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
