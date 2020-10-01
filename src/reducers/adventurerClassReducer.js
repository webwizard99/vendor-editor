import { SET_ADVENTURER_CLASSES } from '../actions/types';

const initialState = {
  classes: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ADVENTURER_CLASSES:
      return {
        ...state,
        classes: action.payload
      }
    default:
      return state;
  }
}