import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// auth
import setAuthToken from "./utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import { setCurrentUser, logoutUser } from "./_actions/authActions";
// import { clearCurrentProfile } from "./_actions/profileActions";

// Components

import NavBar from "./components/common/NavBar";
import Login from "./components/landing/Login";
import Signup from "./components/landing/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import FriendView from "./components/friendView/FriendView4";

// for removing material-ui typography warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// check for token
if (localStorage.jwtToken) {
  //set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // //decode token and get user info and expiration
  // const decoded = jwt_decode(localStorage.jwtToken);
  // //set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));

  // check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   //Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current profile
  //   store.dispatch(clearCurrentProfile());
  //   //Redirect to login
  //   window.location.href = "/";
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <div className="App">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/friendview" component={FriendView} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
