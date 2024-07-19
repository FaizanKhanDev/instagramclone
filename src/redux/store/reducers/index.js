
import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import postReducer from './postReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  post:postReducer,
});

export default rootReducer;
