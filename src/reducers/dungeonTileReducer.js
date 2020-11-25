import { SET_DUNGEON_TILES } from '../actions/types';

const initialState = {
  tiles: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DUNGEON_TILES:
      return {
        ...state,
        tiles: action.payload
      }
    default:
      return state;
  }
}