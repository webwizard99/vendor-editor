import { SET_POTIONS } from '../actions/types';

const initialState = {
  potions: null,
  count: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POTIONS:
      let arrlen = 0;
      if (Array.isArray(action.payload)) {
        arrlen = action.payload.length;
      }
      console.log(arrlen);
      return {
        ...state,
        potions: action.payload,
        count: arrlen
      }
    default:
      return state;
  }
}