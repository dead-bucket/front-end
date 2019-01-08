import { combineReducers } from "redux";

//  TODO - import individual reducers
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import entryReducer from "./entryReducer";

//  TODO - set reducer properties for each reducer
export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  entries: entryReducer
});
