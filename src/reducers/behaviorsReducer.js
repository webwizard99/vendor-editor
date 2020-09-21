import { SET_TOWN_BEHAVIORS, SET_DUNGEON_BEHAVIORS } from '../actions/types';

const initialState = {
  townBehaviors: null,
  dungeonBehaviors: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_TOWN_BEHAVIORS:
      return {
        ...state,
        townBehaviors: action.payload
      }
    case SET_DUNGEON_BEHAVIORS:
      return {
        ...state,
        dungeonBehaviors: action.payload
      }
    default:
      return state;
  }
}