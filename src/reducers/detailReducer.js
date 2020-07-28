import { SET_DETAIL_FORM } from '../actions/types';

const initialState = {
  type: false,
  targetId: null,
  edit: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DETAIL_FORM:
      let newTargetId = action.payload.targetId;
      let newEdit = action.payload.edit;
      let newForm = action.payload.form;
      // if (!newTargetId && newTargetId !== 0) {
      //   newTargetId = state.targetId;
      // }
      // if (!newEdit) {
      //   newEdit = state.edit;
      // }
      // if (!newForm) {
      //   newForm = state.form;
      // }
      return {
        ...state,
        type: newForm,
        targetId: newTargetId,
        edit: newEdit
      }
    default:
      return state;
  }
}