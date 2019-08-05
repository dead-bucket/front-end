import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// auth
import setAuthToken from "./utils/setAuthToken";

// Components
import NoMatch from "./components/common/NoMatch";
import Dashboard from "./components/dashboard/Dashboard";
import FriendView from "./components/friendView/FriendView4";
import Profile from "./components/profile/Profile";
import LandingPage from "./components/landing/LandingPage";

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
          <div className="App">
            <Switch>
              <Route exact path="/" render={() => <LandingPage />} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/deletefriend" render={(props) => <Dashboard {...props} deleting={true} />} />
              <Route exact path="/friendview" component={FriendView} />
              <Route exact path="/profile" component={Profile} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
