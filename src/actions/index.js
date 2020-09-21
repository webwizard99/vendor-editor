import axios from 'axios';
import { FETCH_USER,
  SET_POTIONS, 
  SET_WEAPONS, 
  SET_ARMOR, 
  SET_SUPPLIERS,
  SET_TOWN_BEHAVIORS,
  SET_DUNGEON_BEHAVIORS } from './types';

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