import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import styles from "./LandingPage_styles";
import Signup from "./Signup";
// import zIndex from "@material-ui/core/styles/zIndex";
import CustomButton from "../common/Button";
const logoPrimary = require("../common/thoughtline-logo-primary.svg");
const logoSecondary = require("../common/thoughtline-logo-secondary.svg");

class LandingPage extends Component {
  state = {
    showLogin: false,
    showSignup: false
  };

  handleOpenMenu = e => {
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
          <Login cycleLoginSignup={this.cycleLoginSignup} />

          <br />
          {/* <CustomButton secondary handleClick={this.cycleLoginSignup}>
            Create Account
          </CustomButton> */}
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
