import { SET_MONSTER_DROP_LISTS } from '../actions/types';

const initialState = {
  monster: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MONSTER_DROP_LISTS:
      return {
        ...state,
        monster: action.payload
      }
    default:
      return state;
  }
}