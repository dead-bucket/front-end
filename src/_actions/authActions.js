import axios from "axios";

import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../_actions/types";

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
      .catch(err => console.log("signin err:", err.response));
  };
};

export const loadUser = () => {
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
      .catch(err => console.log(err));
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
