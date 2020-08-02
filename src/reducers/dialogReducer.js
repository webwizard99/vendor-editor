import { SET_DIALOG } from '../actions/types';

const initialState = {
  active: false,
  text: '',
  ref: null,
  yesCallback: null
}

// const referenceState = {
//   active: false,
//   text: '',
//   ref: null,
//   yesCallback: null,
//   noCallback: null
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DIALOG:
      return {
        ...state,
        active: action.payload.active,
        text: action.payload.text,
        ref: action.payload.ref,
        yesCallback: action.payload.yesCallback
      }
    default:
      return state;
  }
}