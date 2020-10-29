import { SET_MONSTER_BEHAVIORS } from '../actions/types';

const initialState = {
  behaviors: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MONSTER_BEHAVIORS:
      return {
        ...state,
        behaviors: action.payload
      }
    default:
      return state;
  }
}