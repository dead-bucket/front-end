import { GET_USER_ENTRIES, GET_INBOX_ENTRIES } from "../_actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ENTRIES:
      return {
        ...state,
        userEntries: action.payload
      };
    case GET_INBOX_ENTRIES:
      return {
        ...state,
        inboxEntries: action.payload
      };
    default:
      return state;
  }
}
