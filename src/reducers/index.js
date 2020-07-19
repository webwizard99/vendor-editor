import { combineReducers } from 'redux';
import authReducer from './authReducer';
import potionsReducer from './potionsReducer';
import detailReducer from './detailReducer';

export default combineReducers({
  auth: authReducer,
  potions: potionsReducer,
  detail: detailReducer
});