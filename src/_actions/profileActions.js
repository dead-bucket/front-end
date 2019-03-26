import axios from "axios";

import { SET_CURRENT_TARGET, SET_CURRENT_NOTIFICATIONS } from "./types";

// set the current target so that FriendView can be displayed
export const setCurrentTarget = target => dispatch => {
  dispatch({
    type: SET_CURRENT_TARGET,
    payload: target
  });
};

export const getNotifications = () => {
  console.log('in get notifications');
  return dispatch => {
    return axios
      .get("/api/v1/notifications/")
      .then(data => {
        console.log('notifiactions: ', data.data)
        dispatch({
          type: SET_CURRENT_NOTIFICATIONS,
          payload: data.data,
        });
      })
      .catch(err => console.log(err));
  };
};


// // Profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };

// // Clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };
