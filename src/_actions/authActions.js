import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//history param was added when withRouter was implemented in Register.js

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/signup", userData)
    .then(res => {
      console.log("successful register", res);
      const token = res.data;
      localStorage.setItem("jwtToken", token);
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => {
  return dispatch => {
    return axios
      .get("/api/v1/signin", userData)
      .then(res => {
        console.log("loginUser res:", res);
        const token = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => console.log(err));
  };
};

// #from dev connector
//  Login - Get user token
// export const loginUser = userData => dispatch => {
// axios
// .get("/api/v1/signin", userData)
// .then(res => {
//save to local storage
// const { token } = res.data;
// set token to localstorage
// localStorage.setItem("jwtToken", token);
// set token to auth header
// token includes user data - need jwtDecode to retrieve the info
// setAuthToken(token);
// decode token to get user data
// const decoded = jwt_decode(token);
//set current user
// dispatch(setCurrentUser(decoded));
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

//Set logged in user
export const setCurrentUser = decoded => {
  console.log("setCurrentUser decoded:", decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log User Out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  // setAuthToken sets the header with the token for every request
  setAuthToken(false);
  //set current user to {} which will set isAthenticated to false
  dispatch(setCurrentUser({}));
};
