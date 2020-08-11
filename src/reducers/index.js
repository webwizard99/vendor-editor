import { combineReducers } from 'redux';
import authReducer from './authReducer';
import potionsReducer from './potionsReducer';
import detailReducer from './detailReducer';
import dialogReducer from './dialogReducer';
import weaponsReducer from './weaponsReducer';
import armorReducer from './armorReducer';

export default combineReducers({
  auth: authReducer,
  potions: potionsReducer,
  weapons: weaponsReducer,
  detail: detailReducer,
  dialog: dialogReducer,
  armor: armorReducer
});