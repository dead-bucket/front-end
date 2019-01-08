import { combineReducers } from "redux";

//  TODO - import individual reducers
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

//  TODO - set reducer properties for each reducer
export default combineReducers({
  auth: authReducer,
  profile: profileReducer
});
