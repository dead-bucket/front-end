import {
  GET_USER_ENTRIES,
  GET_INBOX_ENTRIES,
  SET_ENTRY_MODAL_IMG
} from "../_actions/types";

const initialState = { entryImg: { imgModalOpen: false } };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ENTRIES:
      return {
        ...state,
        userEntries: action.payload
      };
    case SET_ENTRY_MODAL_IMG:
      return {
        ...state,
        entryImg: action.payload
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
