import { SET_CURRENT_TARGET } from "../_actions/types";

// TODO: isEmpty needed?
// import isEmpty from "../utils/isEmpty.js";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TARGET:
      return {
        ...state,
        target: action.payload
      };
    default:
      return state;
  }
}
