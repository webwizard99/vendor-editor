import { combineReducers } from 'redux';
import authReducer from './authReducer';
import potionsReducer from './potionsReducer';
import detailReducer from './detailReducer';
import dialogReducer from './dialogReducer';

export default combineReducers({
  auth: authReducer,
  potions: potionsReducer,
  detail: detailReducer,
  dialog: dialogReducer
});