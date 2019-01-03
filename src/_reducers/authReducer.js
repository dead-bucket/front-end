import { SET_CURRENT_USER } from "../_actions/types";

import isEmpty from "../utils/isEmpty.js";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // if action.payload is empty, the user wasn't authenticated
        isAuthenticated: !isEmpty(action.payload),
        message: action.payload
      };
    default:
      return state;
  }
}
