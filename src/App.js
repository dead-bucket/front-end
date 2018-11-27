import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
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
import FriendView from "./components/friendView/FriendView";
import Timeline from "./components/timeline/Timeline";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/friendview" component={FriendView} />
          <Route exact path="/timeline" component={Timeline} />
        </div>
      </Router>
    );
  }
}

export default App;
