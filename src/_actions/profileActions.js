// import axios from "axios";

import { SET_CURRENT_TARGET } from "./types";

// set the current target so that FriendView can be displayed
export const setCurrentTarget = target => dispatch => {
  dispatch({
    type: SET_CURRENT_TARGET,
    payload: target
  });
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
