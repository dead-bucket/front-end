import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import Signup from "./Signup";

const notificationPic = require("../common/notification.png");
const styles = theme => ({
  title: {
    fontFamily: "Satisfy, cursive",
    fontSize: "3rem",
    color: "#ee5f3f",
    margin: "100px 30px 0px"
  },
  copy: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 100,
    // fontSize: 25,
    fontSize: "1rem",
    textAlign: "center",
    width: "80%",
    maxWidth: 700
  },
  landingLeft: {
    // marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  // landing__loginSignupBtn: {
  //   width: 150,
  //   height: 50
  // },
  landing__loginContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
  },
  landing__loginContainerCloseBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "lightskyblue",
    fontSize: "40px"
  },
  titleImg: {
    alignSelf: "center"
  }
});

class LandingPage extends Component {
  state = {
    showLogin: false,
    showSignup: false
  };

  handleOpenMenu = e => {
    console.log(e.target.value);
    this.setState({ showLogin: !this.state.showLogin });
  };

  handleCloseMenu = () => {
    this.setState({
      showLogin: false,
      showSignup: false
    });
  };
  cycleLoginSignup = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignup: !this.state.showSignup
    });
  };
  render() {
    const { classes } = this.props;
    const { showLogin, showSignup } = this.state;

    const slideLogin = ["landing__login"];
    const slideSignup = ["landing__signup"];
    if (showLogin) {
      slideLogin.push("show");
    }
    if (showSignup) {
      slideSignup.push("show");
    }
    return (
      <div className="landing__container">
        <div className={classes.landingLeft}>
          <p className={classes.title}>Thoughtline</p>
          <button
            className="landing__loginSignupBtn"
            onClick={this.handleOpenMenu}
          >
            Login
          </button>
          <p className={classes.copy}>
            Journaling is a vehicle of emotional exploration, a way to channel
            difficult feelings into healthy and creative outcomes.
          </p>

          <p className={classes.copy}>
            By writing down your thoughts and feelings, you are forced to slow
            down and pay attention to everything that is going on in your life.
            You have to listen rather than run away from your feelings.
          </p>
        </div>

        {/* <img className={classes.titleImg} src={notificationPic} alt="logo" /> */}
        {/* LOGIN */}
        <div className={slideLogin.join(" ")}>
          <div className={classes.landing__loginContainer}>
            <CloseButton
              className={classes.landing__loginContainerCloseBtn}
              onClick={this.handleCloseMenu}
            />
            <p className={classes.title} style={{ color: "lightskyblue" }}>
              Thoughtline
            </p>

            <Login />

            <button
              className="landing__loginSignupBtn"
              onClick={this.cycleLoginSignup}
            >
              Create an account
            </button>
          </div>
        </div>
        {/* SIGNUP */}
        <div className={slideSignup.join(" ")}>
          <div className={classes.landing__loginContainer}>
            <CloseButton
              className={classes.landing__loginContainerCloseBtn}
              onClick={this.handleCloseMenu}
            />
            <p className={classes.title} style={{ color: "lightskyblue" }}>
              Thoughtline
            </p>

            <Signup className="landing__login" />

            <button
              className="landing__loginSignupBtn"
              onClick={this.cycleLoginSignup}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
