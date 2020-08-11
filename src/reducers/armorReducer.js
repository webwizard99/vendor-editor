import { SET_ARMOR } from '../actions/types';

const initialState = {
  armor: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ARMOR:
      return {
        ...state,
        armor: action.payload
      }
    default:
      return state;
  }
}