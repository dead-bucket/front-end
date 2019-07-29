import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import Signup from "./Signup";
// import zIndex from "@material-ui/core/styles/zIndex";
import CustomButton from "../common/Button";
const logoPrimary = require("../common/thoughtline-logo-primary.svg");
const logoSecondary = require("../common/thoughtline-logo-secondary.svg");

const styles = theme => ({
  title: {
    fontFamily: "Satisfy, cursive",
    fontSize: "3rem",
    color: "#ee5f3f",
    margin: "0px 30px 0px"
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px"
  },
  logo: {
    width: 125
  },
  logoSmall: {
    width: 100
  },
  logoContainerSmall: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "20px"
  },
  titleSmall: {
    fontFamily: "Satisfy, cursive",
    fontSize: "2rem",
    color: "#ee5f3f",
    margin: "0px 30px 0px"
  },

  copy: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 200,
    fontSize: "1rem",
    textAlign: "center",
    margin: "20px 0px",
    width: "80%",
    maxWidth: 700
  },

  landingLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
          <div className={classes.logoContainer}>
            <img
              src={logoPrimary}
              alt="Thoughtline logo"
              className={classes.logo}
            />
            <p className={classes.title}>Thoughtline</p>
          </div>
          <p className={classes.copy}>
            Journaling is a vehicle of emotional exploration, a way to channel
            difficult feelings into healthy and creative outcomes.
          </p>
          <p className={classes.copy}>
            By writing down your thoughts and feelings, you are forced to slow
            down and pay attention to everything that is going on in your life.
            You have to listen rather than run away from your feelings.
          </p>
          <CustomButton primary handleClick={this.handleOpenMenu}>
            Login
          </CustomButton>
        </div>

        {/* LOGIN */}
        <div className={slideLogin.join(" ")}>
          <CloseButton
            className={classes.landing__loginContainerCloseBtn}
            onClick={this.handleCloseMenu}
          />
          <div className={classes.logoContainer}>
            <img
              src={logoSecondary}
              alt="Thoughtline logo"
              className={classes.logo}
            />
            <p className={classes.title} style={{ color: "lightskyblue" }}>
              Thoughtline
            </p>
          </div>
          <Login />

          <br />
          <CustomButton secondary handleClick={this.cycleLoginSignup}>
            Create Account
          </CustomButton>
        </div>
        {/* SIGNUP */}
        <div className={slideSignup.join(" ")}>
          <CloseButton
            className={classes.landing__loginContainerCloseBtn}
            onClick={this.handleCloseMenu}
          />
          <div className={classes.logoContainerSmall}>
            <img
              src={logoSecondary}
              alt="Thoughtline logo"
              className={classes.logoSmall}
            />
            <p className={classes.titleSmall} style={{ color: "lightskyblue" }}>
              Thoughtline
            </p>
            <h6 style={{ margin: 0, textAlign: "center" }}>Create Account</h6>
          </div>

          <Signup
            cycleLoginSignup={this.cycleLoginSignup}
            className="landing__login"
          />

          <br />
          {/* <CustomButton secondary handleClick={this.cycleLoginSignup}>
            Login
          </CustomButton> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
