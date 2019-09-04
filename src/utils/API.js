let API;
if (process.env.REACT_APP_ENV === "production") {
  API = "https://dead-bucket-back-end.herokuapp.com";
} else {
  API = "http://localhost:4000";

}


export default API;
