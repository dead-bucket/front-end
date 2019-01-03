import React, { Component } from "react";
import LoginSignup from "./LoginSignup";
import Login from "./Login";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container" id="landing">
        <h1>Welcome to Thoughtline</h1>
        <Login />
      </div>
    );
  }
}
export default Landing;
