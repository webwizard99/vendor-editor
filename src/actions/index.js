import axios from 'axios';
import { FETCH_USER, SET_POTIONS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchPotions = () => async dispatch => {
  const res = await axios.get('/potions');
  dispatch({ type: SET_POTIONS, payload: res.data});
}