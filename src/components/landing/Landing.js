import React, { Component } from "react";
import LoginSignup from "./LoginSignup";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container" id="landing">
        <h1>Welcome to Thoughtline</h1>
        <LoginSignup />
      </div>
    );
  }
}
export default Landing;
