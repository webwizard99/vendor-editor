import { SET_MONSTER_DROP_LISTS,
  SET_TREASURE_DROP_LISTS } from '../actions/types';

const initialState = {
  monster: null,
  treasure: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MONSTER_DROP_LISTS:
      return {
        ...state,
        monster: action.payload
      }
    case SET_TREASURE_DROP_LISTS:
      return {
        ...state,
        treasure: action.payload
      }
    default:
      return state;
  }
}