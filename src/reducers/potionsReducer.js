import { SET_POTIONS } from '../actions/types';

const initialState = {
  potions: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POTIONS:
      return {
        ...state,
        potions: action.payload
      }
    default:
      return state;
  }
}