import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../actions/types';

const initialState = {
  type: false,
  targetId: null,
  edit: false,
  refresh: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DETAIL_FORM:
      let newTargetId = action.payload.targetId;
      let newEdit = action.payload.edit;
      let newForm = action.payload.form;
      return {
        ...state,
        type: newForm,
        targetId: newTargetId,
        edit: newEdit
      }
    case SET_DETAIL_REFRESH:
      return {
        ...state,
        refresh: action.value
      }
    default:
      return state;
  }
}