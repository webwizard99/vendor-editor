import { SET_BREADCRUMB, SET_BREADCRUMB_FORMDATA } from '../actions/types';

const initialState = {
  active: false,
  name: '',
  formData: null,
  formDataName: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BREADCRUMB:
      const active = action.payload.active;
      const name = action.payload.name;
      return {
        ...state,
        active: active,
        name: name
      }
    case SET_BREADCRUMB_FORMDATA:
      return {
        ...state,
        formData: action.payload.formData,
        formDataName: action.payload.formDataName
      }
    default:
      return state;
  }
}