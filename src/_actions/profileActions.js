import axios from "axios";
import API from "../utils/API";
import {
  SET_CURRENT_TARGET,
  SET_CURRENT_NOTIFICATIONS,
  SET_DASHBOARD
} from "./types";

// set the current target so that FriendView can be displayed
export const setCurrentTarget = target => dispatch => {
  dispatch({
    type: SET_CURRENT_TARGET,
    payload: target
  });
};

export const getFriends = () => {
  return dispatch => {
    return axios
      .get(API + "/api/v1/dashboard/")
      .then(data => {
        dispatch({
          type: SET_DASHBOARD,
          payload: data.data
        });
      })
      .catch(err => console.log(err));
  };
};

export const getNotifications = () => {
  return dispatch => {
    return axios
      .get(API + "/api/v1/notifications/")
      .then(data => {
        dispatch({
          type: SET_CURRENT_NOTIFICATIONS,
          payload: data.data
        });
      })
      .catch(err => console.log(err));
  };
};
