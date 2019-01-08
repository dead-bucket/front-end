import { GET_USER_ENTRIES } from "../_actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ENTRIES:
      return {
        ...state,
        userEntries: action.payload
      };
    default:
      return state;
  }
}
