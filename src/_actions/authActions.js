import axios from "axios";
import API from "../utils/API";
import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_LOGIN_ERRORS,
  SET_SIGNUP_ERRORS,
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS
} from "../_actions/types";

import setAuthToken from "../utils/setAuthToken";
import { getNotifications } from "./profileActions";

export const registerUser = (userData, history) => {
  return dispatch => {
    return axios
      .post(API + "/api/v1/signup", userData)
      .then(res => {
        const { token, user } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        dispatch({
          type: SET_CURRENT_USER,
          payload: user
        });

        history.push("/dashboard");
      })
      .then(() => getNotifications())
      .catch(err => {
        const { data } = err.response;
        console.log("error from signup", data);
        if (data.includes("username")) {
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: {
              usernameErr: "That username is taken.  Please try again."
            }
          });
        } else if (data.includes("email")) {
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: {
              emailErr:
                "That email address is already in use.  Please try again."
            }
          });
        } else {
          dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: {
              generalErr: "We're having issues.  Please try again later."
            }
          });
        }
      });
  };
};

export const loginUser = (userData, history) => {
  return dispatch => {
    return axios
      .get(API + "/api/v1/signin", {
        auth: {
          username: userData.username,
          password: userData.password
        }
      })
      .then(res => {
        const { token, user } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        dispatch({
          type: SET_CURRENT_USER,
          payload: user
        });

        history.push("/dashboard");
      })
      .then(() => getNotifications())
      .catch(err => {
        const { data } = err.response;
        if (data.includes("Username")) {
          dispatch({
            type: SET_LOGIN_ERRORS,
            payload: { usernameErr: "Please enter a valid Username." }
          });
        } else if (data.includes("Password")) {
          dispatch({
            type: SET_LOGIN_ERRORS,
            payload: { passwordErr: "Incorrect password. Please try again." }
          });
        } else {
          dispatch({
            type: SET_LOGIN_ERRORS,
            payload: {
              generalErr: "We're having issues.  Please try again later."
            }
          });
        }
      });
  };
};

export const loadUser = history => {
  return dispatch => {
    return axios
      .get(API + "/api/v1/loggedinuser/")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data
        });
      })
      .then(() => getNotifications())
      .catch(err => history.push("/"));
  };
};

export const clearLoginErrors = () => dispatch => {
  dispatch({
    type: CLEAR_LOGIN_ERRORS,
    payload: null
  });
};
export const clearSignupErrors = () => dispatch => {
  dispatch({
    type: CLEAR_SIGNUP_ERRORS,
    payload: null
  });
};

//Log User Out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: null
  });
  //remove the auth header for future requests
  // setAuthToken sets the header with the token for every request
  setAuthToken(false);
};
