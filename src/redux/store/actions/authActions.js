import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  VERIFY_OTP_REQUEST,
  ON_AUTH_STATE_CHANGE,
  SET_TOKEN,
} from './actionTypes';
// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

/* ------ Login ------ */
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

/* ----- SET TOKEN ------ */
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});


/* ------ Verify OTP ------ */
export const verifyOtpRequest = () => ({
  type: VERIFY_OTP_REQUEST,
})

export const onAuthStateChange = (data) => ({
  payload: data,
  type: ON_AUTH_STATE_CHANGE
})