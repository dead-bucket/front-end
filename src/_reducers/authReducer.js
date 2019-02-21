import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_LOGIN_ERRORS,
  CLEAR_LOGIN_ERRORS
} from "../_actions/types";

const initialState = { loginErrors: {} };

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
    case SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload
      };
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: {}
      };
    default:
      return state;
  }
}
