import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";

const initialState = {};

const middleware = [thunk];
let store;

console.log("in store setup env =", process.env.REACT_APP_ENV);
// if (process.env.REACT_APP_ENV === "production") {
if (true) {
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
