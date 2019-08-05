import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CloseButton from "@material-ui/icons/Close";
import Login from "./Login";
import "./LandingPage.css";
import styles from "./LandingPage_styles";
import Signup from "./Signup";
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
    showImageUpload: false
  };

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

  cycleShowImgUpload = () => {
    this.props.clearSignupErrors();
    const results = signupValidate(this.getSignupInfo(), this.state.password2);
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

  handleInputChange = name => event => {
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
        username,
        email,
        password,
        picture
      };
    } else {
      signupData = {
        firstname,
        lastname,
        username,
        email,
        password
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
    if (showSignup) {
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
          <p className={classes.copy}>
            Journaling is a vehicle of emotional exploration, a way to channel
            difficult feelings into healthy and creative outcomes.
          </p>
          <p className={classes.copy}>
            By writing down your thoughts and feelings, you are forced to slow
            down and pay attention to everything that is going on in your life.
            You have to listen rather than run away from your feelings.
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
            <img
              src={logoPrimary}
              alt="Thoughtline logo"
              className={classes.logoSmall}
            />
            <p className={classes.titleSmall}>Thoughtline</p>
          </div>

          <Signup
            {...this.state}
            updateFields={this.handleInputChange}
            signupErrors={signupErrors}
            switchSignupToLogin={this.switchSignupToLogin}
            cycleShowImgUpload={this.cycleShowImgUpload}
            cycleLoginSignup={this.cycleLoginSignup}
            className="landing__login"
          />
          <br />
        </div>

        {/* imgUpload */}
        <div className={slideImageUpload.join(" ")}>
          <CloseButton
            className={classes.landing__loginContainerCloseBtn}
            onClick={this.handleCloseMenu}
          />
          <div className={classes.logoContainerSmall}>
            <img
              src={logoPrimary}
              alt="Thoughtline logo"
              className={classes.logoSmall}
            />
            <p className={classes.titleSmall}>Thoughtline</p>
          </div>
          <Button secondary handleClick={this.cycleShowImgUpload}>
            Back
          </Button>

          <ImgUpload updateImg={this.handleProfileImg} />
          <Button primary handleClick={this.registerUser}>
            Register
          </Button>
          <p className="or_seperator">or</p>
          <Button secondary handleClick={this.switchSignupToLogin}>
            Login
          </Button>
          <br />
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
