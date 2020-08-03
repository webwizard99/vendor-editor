import { SET_DETAIL_UPDATE } from '../actions/types';

const initialState = {
  detailUpdate = false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DETAIL_UPDATE:
      return {
        ...state,
        detailUpdate: action.value
      }
    default:
      return state;
  }
}