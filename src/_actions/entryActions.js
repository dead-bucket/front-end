import axios from "axios";
import API from "../utils/API";

import {
  GET_USER_ENTRIES,
  GET_INBOX_ENTRIES,
  SET_ENTRY_MODAL_IMG
} from "../_actions/types";

export const deleteEntry = (entryId, targetId) => {
  axios
    .delete(API + `api/v1/entry/${entryId}`)
    .then(() => getEntries(targetId))
    .catch(err => console.log(err));
};
export const setEntryModalImg = target => dispatch => {
  dispatch({
    type: SET_ENTRY_MODAL_IMG,
    payload: target
  });
};

export const getEntries = targetId => {
  return dispatch => {
    return axios
      .post(API + "/api/v1/targetentry/", {
        recipient: targetId
      })
      .then(data => {
        dispatch({
          type: GET_USER_ENTRIES,
          payload: data.data.userEntries
        });
      })
      .catch(err => console.log(err));
  };
};

export const getInboxEntries = targetId => {
  return dispatch => {
    return axios
      .get(API + "/api/v1/inbox/?sender=" + targetId)
      .then(data => {
        dispatch({
          type: GET_INBOX_ENTRIES,
          payload: data.data
        });
      })
      .catch(err => console.log(err));
  };
};
