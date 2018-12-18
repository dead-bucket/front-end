import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./_actions/authActions";
import { clearCurrentProfile } from "./_actions/profileActions";

// Components
import PrivateRoute from "./components/common/PrivateRoute";
import NavBar from "./components/common/NavBar";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import FriendView4 from "./components/friendView/FriendView4";

// for removing material-ui typography warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// check for token
if (localStorage.jwtToken) {
  //set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/";
  }
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
                <Route exact path="/" component={Landing} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/friendview"
                  component={FriendView4}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
