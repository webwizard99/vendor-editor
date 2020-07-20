import { SET_DETAIL_FORM } from '../actions/types';

const initialState = {
  type: false,
  targetId: null,
  edit: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_DETAIL_FORM:
      return {
        ...state,
        type: action.form
      }
    default:
      return state;
  }
}