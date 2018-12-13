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
// import logo from './logo.svg';
// import './App.css';

// Components
import NavBar from "./components/common/NavBar";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import FriendView from "./components/friendView/FriendView";
import FriendView2 from "./components/friendView/FriendView2";
import FriendView3 from "./components/friendView/FriendView3";
import FriendView4 from "./components/friendView/FriendView4";
import Timeline from "./components/timeline/Timeline";
import ReceivedTimeline from "./components/receivedTimeline/ReceivedTimeline";

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
              <Route exact path="/friendview" component={FriendView} />
              <Route exact path="/friendview2" component={FriendView2} />
              <Route exact path="/friendview3" component={FriendView3} />
              <Route exact path="/friendview4" component={FriendView4} />
              <Route exact path="/thoughtline" component={Timeline} />
              <Route exact path="/received" component={ReceivedTimeline} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
