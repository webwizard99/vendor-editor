import { SET_MONSTERS } from '../actions/types';

const initialState = {
  monsters: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MONSTERS:
      return {
        ...state,
        monsters: action.payload
      }
    default:
      return state;
  }
}