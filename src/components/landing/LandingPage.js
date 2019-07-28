import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import Signup from "./Signup";
import SignUpSlider from "./SignUpSlider";
const logoPrimary = require("../common/thoughtline-logo-primary.svg");
const logoSecondary = require("../common/thoughtline-logo-secondary.svg");

const styles = theme => ({
  title: {
    fontFamily: "Satisfy, cursive",
    fontSize: "3rem",
    color: "#ee5f3f",
    margin: "0px 30px 0px"
  },
  copy: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 200,
    // fontSize: 25,
    fontSize: "1rem",
    textAlign: "center",
    margin: 0,
    width: "80%",
    maxWidth: 700
  },
  landingLeft: {
    // marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
    // flex: 2
  },
  logo: {
    width: 125
  },
  // landing__loginSignupBtn: {
  //   width: 150,
  //   height: 50
  // },
  landing__loginContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
  },

  landing__loginContainerCloseBtn: {
    position: "absolute",
    top: "15px",
    left: "15px",
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
          <img
            src={logoPrimary}
            alt="Thoughtline logo"
            className={classes.logo}
          />
          <p className={classes.title}>Thoughtline</p>
          <p className={classes.copy}>
            Journaling is a vehicle of emotional exploration, a way to channel
            difficult feelings into healthy and creative outcomes.
          </p>
          <p className={classes.copy}>
            By writing down your thoughts and feelings, you are forced to slow
            down and pay attention to everything that is going on in your life.
            You have to listen rather than run away from your feelings.
          </p>
          <button
            className="landing__loginSignupBtn"
            onClick={this.handleOpenMenu}
          >
            Login
          </button>
        </div>

        {/* LOGIN */}
        <div className={slideLogin.join(" ")}>
          <div className={classes.landing__loginContainer}>
            <CloseButton
              className={classes.landing__loginContainerCloseBtn}
              onClick={this.handleCloseMenu}
            />
            <img
              src={logoSecondary}
              alt="Thoughtline logo"
              className={classes.logo}
            />
            <p className={classes.title} style={{ color: "lightskyblue" }}>
              Thoughtline
            </p>

            <Login />

            <button
              className="landing__loginSignupBtn"
              onClick={this.cycleLoginSignup}
            >
              Create account
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
            <img
              src={logoSecondary}
              alt="Thoughtline logo"
              className={classes.logo}
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
