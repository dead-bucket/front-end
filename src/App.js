import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store";
// import PrivateRoute from "./components/common/PrivateRoute";

// auth
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
// import { setCurrentUser, logoutUser } from "./_actions/authActions";
// import { clearCurrentProfile } from "./_actions/profileActions";

// Components
import NavBar from "./components/common/NavBar";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";

import FriendView4 from "./components/friendView/FriendView4";

// for removing material-ui typography warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/friendview" component={FriendView4} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
