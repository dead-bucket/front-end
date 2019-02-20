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
import NoMatch from "./components/common/NoMatch";
import Login from "./components/landing/Login";
import Signup from "./components/landing/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import FriendView from "./components/friendView/FriendView4";

import "./App.css";

// for removing material-ui typography warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// check for token
if (localStorage.jwtToken) {
  //set the auth token header auth
  setAuthToken(localStorage.jwtToken);
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
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
