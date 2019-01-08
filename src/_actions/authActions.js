import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/signup", userData)
    .then(res => {
      const token = res.data;
      localStorage.setItem("jwtToken", token);
      history.push("/dashboard");
    })
    .catch(err => console.log("signup error: ", err));
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
        console.log("loginUser res:", res);
        const token = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        history.push("/dashboard");
      })
      .catch(err => console.log(err));
  };
};

//Log User Out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  // setAuthToken sets the header with the token for every request
  setAuthToken(false);
};
