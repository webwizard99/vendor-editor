import { SET_BREADCRUMB, SET_BREADCRUMB_FORMDATA } from '../actions/types';

const initialState = {
  active: false,
  name: '',
  formData: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BREADCRUMB:
      console.log('in breadcrumb reducer');
      const active = action.payload.active;
      const name = action.payload.name;
      // console.log(`active: ${active}, name: ${name}`);
      return {
        ...state,
        active: active,
        name: name
      }
    case SET_BREADCRUMB_FORMDATA:
      return {
        ...state,
        formData: action.formData
      }
    default:
      return state;
  }
}