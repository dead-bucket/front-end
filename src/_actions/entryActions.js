import axios from "axios";
import { GET_USER_ENTRIES, GET_INBOX_ENTRIES } from "../_actions/types";
export const postEntry = entry => {
  axios
    .post("/api/v1/entry", entry)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
export const deleteEntry = (entryId, targetId) => {
  axios
    .delete(`api/v1/entry/${entryId}`)
    // .then(data => console.log(data))
    .then(() => getEntries(targetId))
    .catch(err => console.log(err));
}

export const getEntries = targetId => {
  console.log('in get entries');
  return dispatch => {
    return axios
      .post("/api/v1/targetentry/", {
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
      .get("/api/v1/inbox/?sender=" + targetId)
      .then(data => {
        dispatch({
          type: GET_INBOX_ENTRIES,
          payload: data.data
        });
      })
      .catch(err => console.log(err));
  };
};
