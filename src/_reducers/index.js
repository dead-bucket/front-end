import { combineReducers } from "redux";

//  TODO - import individual reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//  TODO - set reducer properties for each reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
