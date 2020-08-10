import { SET_WEAPONS } from '../actions/types';

const initialState = {
  weapons: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_WEAPONS:
      return {
        ...state,
        weapons: action.payload
      }
    default:
      return state;
  }
}