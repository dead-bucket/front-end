import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import styles from "./LandingPage_styles";
import Signup from "./Signup";
import Register from "./registerForSignup";
import ImgUpload from "../common/ImgUpload";
// import zIndex from "@material-ui/core/styles/zIndex";
import Button from "../common/Button";

//REDUX
import { connect } from "react-redux";
import { isEmpty, signupValidate } from "../../utils/validation";
import { registerUser, clearSignupErrors } from "../../_actions/authActions";

const logoPrimary = require("../common/thoughtline-logo-primary.svg");
const logoSecondary = require("../common/thoughtline-logo-secondary.svg");

class LandingPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    picture: "",
    password: "",
    password2: "",
    passwordError: "",
    showLogin: false,
    showSignup: false,
    showImageUpload: false,
    checked: false
  };
  componentDidUpdate(prevProps) {
    if (prevProps.signupErrors.error !== this.props.signupErrors.error) {
      this.showSignup();
    }
  }

  handleOpenMenu = e => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  handleCloseMenu = () => {
    this.setState({
      showLogin: false,
      showSignup: false,
      showImageUpload: false
    });
  };
  cycleLoginSignup = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignup: !this.state.showSignup
    });
  };

  switchSignupToLogin = () => {
    this.setState({
      showLogin: true,
      showImageUpload: false,
      showSignup: false
    });
  };

  showSignup = () => {
    this.setState({
      showLogin: false,
      showImageUpload: false,
      showSignup: true
    });
  };

  cycleShowImgUpload = () => {
    const results = signupValidate(
      this.getSignupInfo(),
      this.state.password2.toLowerCase()
    );
    if (!isEmpty(results)) {
      this.setState({
        passwordError: results
      });
    } else {
      this.setState({
        showImageUpload: !this.state.showImageUpload,
        passwordError: ""
      });
    }
  };
  handleProfileImg = picture => {
    this.setState({ picture });
  };
  handleTick = () => {
    let checked = !this.state.checked;
    this.setState({ checked: checked });
  };
  handleInputChange = name => event => {
    if (this.props.signupErrors.error) {
      this.props.clearSignupErrors();
    }
    this.setState({
      [name]: event.target.value
    });
  };

  getSignupInfo = () => {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      picture
    } = this.state;

    let signupData;
    if (firstname && lastname && username && email && password && picture) {
      signupData = {
        firstname,
        lastname,
        username: username.toLowerCase(),
        email,
        password: password.toLowerCase(),
        picture
      };
    } else {
      signupData = {
        firstname,
        lastname,
        username: username.toLowerCase(),
        email,
        password: password.toLowerCase()
      };
    }

    return signupData;
  };

  registerUser = () => {
    this.props.clearSignupErrors();
    this.props.registerUser(this.getSignupInfo(), this.props.history);
  };

  render() {
    const { classes, signupErrors } = this.props;
    const { showLogin, showSignup, showImageUpload } = this.state;
    const slideLogin = ["landing__login"];
    const slideSignup = ["landing__signup"];
    const slideImageUpload = ["landing__imgUpload"];
    if (showLogin) {
      slideLogin.push("show");
    }
    if (showSignup || signupErrors.errors) {
      slideSignup.push("show");
    }
    if (showImageUpload) {
      slideImageUpload.push("show");
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
          <p className={classes.copy}>Mindfulness.</p>
          <p className={classes.copy}>Emotional and Mental Intelligence.</p>
          <p className={classes.copy}>Communication Skills.</p>
          <p className={classes.copy}>Healing.</p>
          <p className={classes.copy}>
            These traits are vital to a healthy and happy life, and all of them
            can be improved by externalizing your thoughts and expressing
            yourself.
          </p>
          <p className={classes.copy}>
            By joining Thoughtline, you'll be more in touch with yourself and
            the world around you.
          </p>
          <p className={classes.copy}>
            Keep a personal record of life's special moments and help yourself
            work through the difficult times.
          </p>
          <p className={classes.copy} style={{ marginBottom: 20 }}>
            Be a better you with Thoughtline.
          </p>
          <Button primary handleClick={this.handleOpenMenu}>
            Login
          </Button>
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
        </div>
        {/* SIGNUP */}
        <div className={slideSignup.join(" ")}>
          <CloseButton
            className={classes.landing__loginContainerCloseBtn}
            onClick={this.handleCloseMenu}
          />

          <div className={classes.logoContainerSmall}>
            <p className={classes.titleSmall}>Thoughtline</p>
          </div>
          {process.env.REACT_APP_BETA === "true" ? (
            <Signup
              {...this.state}
              updateFields={this.handleInputChange}
              signupErrors={signupErrors}
              switchSignupToLogin={this.switchSignupToLogin}
              cycleShowImgUpload={this.cycleShowImgUpload}
              cycleLoginSignup={this.cycleLoginSignup}
              className="landing__login"
            />
          ) : (
            <Register
              {...this.state}
              updateFields={this.handleInputChange}
              signupErrors={signupErrors}
              switchSignupToLogin={this.switchSignupToLogin}
              close={this.handleCloseMenu}
              cycleLoginSignup={this.cycleLoginSignup}
              className="landing__login"
              tick={this.handleTick}
            />
          )}
          <br />
        </div>

        {/* imgUpload */}
        <div className={slideImageUpload.join(" ")}>
          <CloseButton
            className={classes.landing__loginContainerCloseBtn}
            onClick={this.handleCloseMenu}
          />
          <div className={classes.logoContainerSmall}>
            <p className={classes.titleSmall} style={{ marginBottom: "2rem" }}>
              Thoughtline
            </p>
          </div>
          <Button
            secondary
            handleClick={this.cycleShowImgUpload}
            style={{ marginTop: 20 }}
          >
            Back
          </Button>
          <p className={classes.profileImgTitle}>Add a Profile Pic</p>
          <ImgUpload updateImg={this.handleProfileImg} />
          <div className={classes.centeredColumn}>
            <Button primary handleClick={this.registerUser}>
              Register
            </Button>
            <p className="or_seperator">or</p>
            <Button secondary handleClick={this.switchSignupToLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signupErrors: state.auth.signupErrors
});

export default connect(
  mapStateToProps,
  { registerUser, clearSignupErrors }
)(withStyles(styles)(withRouter(LandingPage)));
