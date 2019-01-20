import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../_actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: {}
      };
    default:
      return state;
  }
}
