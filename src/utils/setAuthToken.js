import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    // axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //delete the auth header if no token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
