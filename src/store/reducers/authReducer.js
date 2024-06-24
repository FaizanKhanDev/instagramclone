const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  // Action types
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGIN_FAILURE = 'LOGIN_FAILURE';
  const LOGOUT = 'LOGOUT';
  const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
  const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
  
  // Reducer function
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
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
  