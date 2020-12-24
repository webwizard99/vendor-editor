import { SET_LEVELS } from '../actions/types';

const intialState = {
  levels: null
}

export default function(state = intialState, action) {
  switch (action.type) {
    case SET_LEVELS:
      return {
        ...state,
        levels: action.payload
      }
    default:
      return state;
  }
}