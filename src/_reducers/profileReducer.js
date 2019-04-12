import {
  SET_CURRENT_TARGET,
  SET_CURRENT_NOTIFICATIONS,
  SET_DASHBOARD
} from "../_actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TARGET:
      return {
        ...state,
        target: action.payload
      };
    case SET_CURRENT_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case SET_DASHBOARD:
      return {
        ...state,
        friends: action.payload
      };
    default:
      return state;
  }
}
