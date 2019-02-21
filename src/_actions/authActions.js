import axios from "axios";

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_LOGIN_ERRORS
} from "../_actions/types";

import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => {
  return dispatch => {
    return axios
      .post("/api/v1/signup", userData)
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
      .catch(err => console.log("signup error: ", err));
  };
};

export const loginUser = (userData, history) => {
  return dispatch => {
    return axios
      .get("/api/v1/signin", {
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
        console.log("signin err:", data);
      });
  };
};

export const loadUser = history => {
  return dispatch => {
    return axios
      .get("/api/v1/loggedinuser/")
      .then(res => {
        console.log(res);
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data
        });
      })
      .catch(err => history.push("/"));
  };
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
