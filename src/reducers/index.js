import { combineReducers } from 'redux';
import authReducer from './authReducer';
import potionsReducer from './potionsReducer';
import detailReducer from './detailReducer';
import dialogReducer from './dialogReducer';
import weaponsReducer from './weaponsReducer';
import armorReducer from './armorReducer';
import supplierReducer from './supplierReducer';
import behaviorsReducer from './behaviorsReducer';
import adventurerClassReducer from './adventurerClassReducer';
import adventurerReducer from './adventurerReducer';
import dropListReducer from './dropListReducer';
import monsterBehaviorReducer from './monsterBehaviorReducer';
import monsterReducer from './monsterReducer';
import breadcrumbReducer from './breadcrumbReducer';
import dungeonTileReducer from './dungeonTileReducer';
import levelReducer from './levelReducer';

export default combineReducers({
  auth: authReducer,
  potions: potionsReducer,
  weapons: weaponsReducer,
  detail: detailReducer,
  dialog: dialogReducer,
  armor: armorReducer,
  suppliers: supplierReducer,
  behaviors: behaviorsReducer,
  adventurerClasses: adventurerClassReducer,
  adventurers: adventurerReducer,
  dropLists: dropListReducer,
  monsterBehaviors: monsterBehaviorReducer,
  monsters: monsterReducer,
  breadcrumb: breadcrumbReducer,
  dungeonTiles: dungeonTileReducer,
  levels: levelReducer
});