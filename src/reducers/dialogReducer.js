import { SET_DIALOG } from '../actions/types';

const initialState = {
  active: false,
  text: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DIALOG:
      console.log(action.payload);
      return {
        ...state,
        active: action.payload.active,
        text: action.payload.text
      }
    default:
      return state;
  }
}