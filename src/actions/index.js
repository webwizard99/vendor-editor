import axios from 'axios';
import { FETCH_USER,
  SET_POTIONS, 
  SET_WEAPONS, 
  SET_ARMOR, 
  SET_SUPPLIERS,
  SET_TOWN_BEHAVIORS,
  SET_DUNGEON_BEHAVIORS,
  SET_ADVENTURER_CLASSES,
  SET_ADVENTURERS,
  SET_MONSTER_DROP_LISTS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchPotions = () => async dispatch => {
  const res = await axios.get('/potions');
  dispatch({ type: SET_POTIONS, payload: res.data });
}

export const fetchWeapons = () => async dispatch => {
  const res = await axios.get('/weapons');
  dispatch({ type: SET_WEAPONS, payload: res.data });
}

export const fetchArmor = () => async dispatch => {
  const res = await axios.get('/armor');
  dispatch({ type: SET_ARMOR, payload: res.data });
}

export const fetchSuppliers = () => async dispatch => {
  const res = await axios.get('/suppliers');
  dispatch({ type: SET_SUPPLIERS, payload: res.data });
}

export const fetchTownBehaviors = () => async dispatch => {
  const res = await axios.get('/town_behaviors');
  dispatch({ type: SET_TOWN_BEHAVIORS, payload: res.data });
}

export const fetchDungeonBehaviors = () => async dispatch => {
  const res = await axios.get('/dungeon_behaviors');
  dispatch({ type: SET_DUNGEON_BEHAVIORS, payload: res.data });
}

export const fetchAdventurerClasses = () => async dispatch => {
  const res = await axios.get('/adventurer_classes');
  dispatch({ type: SET_ADVENTURER_CLASSES, payload: res.data });
}

export const fetchAdventurers = () => async dispatch => {
  const res = await axios.get('/adventurers');
  dispatch({ type: SET_ADVENTURERS, payload: res.data });
}

export const loadAdventurerDetails = () => async dispatch => {
  dispatch(fetchTownBehaviors());
  dispatch(fetchDungeonBehaviors());
  dispatch(fetchAdventurerClasses());
}

export const fetchMonsterDropLists = () => async dispatch => {
  const res = await axios.get('/monster_drop_lists');
  dispatch({ type: SET_MONSTER_DROP_LISTS, payload: res.data });
}