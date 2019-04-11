// const API = "https://dead-bucket-back-end.herokuapp.com";
// const API = "http://localhost:4000";
let API;
if (process.env.NODE_ENV === 'production') {
  API = "https://dead-bucket-back-end.herokuapp.com";
} else {
  API = "http://localhost:4000";
}
export default API;
