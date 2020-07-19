import { combineReducers } from 'redux';
import authReducer from './authReducer';
import potionsReducer from './potionsReducer';

export default combineReducers({
  auth: authReducer,
  potions: potionsReducer
});