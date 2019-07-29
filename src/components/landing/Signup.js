import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import CustomButton from "../common/Button";
import ImgUpload from "../common/ImgUpload";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//REDUX
import { connect } from "react-redux";
import { isEmpty, signupValidate } from "../../utils/validation";
import { registerUser, clearSignupErrors } from "../../_actions/authActions";

const styles = {
  signupContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll"
  },
  form: {
    width: "90%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imgUploadContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  error: {
    color: "white",
    fontSize: 14,
    margin: 10
  }
};

// const notificationPic = require("../common/notification.png");

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    picture: "",
    password: "",
    password2: "",
    passwordError: ""
  };

  handleProfileImg = picture => {
    this.setState({ picture });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  registerUser = () => {
    // TODO - Authenticate passwords
    this.setState({ passwordError: {} });
    this.props.clearSignupErrors();
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      password2,
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

    const results = signupValidate(signupData, password2);
    if (!isEmpty(results)) {
      this.setState({ passwordError: results });
      return;
    }

    this.props.registerUser(signupData, this.props.history);
  };
  // TODO - get rid of ids on TextFields
  render() {
    const { classes, signupErrors } = this.props;
    const { usernameErr, emailErr, generalErr } = signupErrors;
    const {
      passwordError,
      firstname,
      lastname,
      username,
      email,
      password,
      password2
    } = this.state;

    return (
      <div
        tabIndex={-1}
        className="landing__signupContainer"
        // className={classes.signupContainer}
        // onKeyDown={e => (e.key === "Enter" ? this.registerUser() : null)}
      >
        {/* Slide 1 */}
        <form className={classes.form} autoComplete="off">
          <TextField
            id="signup-outlined-firstname"
            label="First name"
            required
            // className={classes.textField}
            value={this.state.firstname}
            onChange={this.handleInputChange("firstname")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="signup-outlined-lastname"
            label="Last name"
            required
            // className={classes.textField}
            value={this.state.lastname}
            onChange={this.handleInputChange("lastname")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="signup-outlined-username"
            label="Username"
            required
            // className={classes.textField}
            value={this.state.username}
            onChange={this.handleInputChange("username")}
            margin="normal"
            variant="outlined"
          />
          {usernameErr ? <p className={classes.error}>{usernameErr}</p> : null}

          {/* Slide 2 */}

          <TextField
            id="signup-outlined-email"
            label="Email"
            required
            // className={classes.textField}
            value={this.state.email}
            onChange={this.handleInputChange("email")}
            margin="normal"
            variant="outlined"
          />
          {passwordError.email ? (
            <p className={classes.error}>{passwordError.email}</p>
          ) : null}
          {emailErr ? <p className={classes.error}>{emailErr}</p> : null}
          <TextField
            id="signup-outlined-password1-input"
            label="Password"
            className={classes.textField}
            type="password"
            required
            value={this.state.password}
            onChange={this.handleInputChange("password")}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          {passwordError.password ? (
            <p className={classes.error}>{passwordError.password}</p>
          ) : null}
          <TextField
            id="signup-outlined-password2-input"
            label="Confirm Password"
            className={classes.textField}
            type="password"
            required
            value={this.state.password2}
            onChange={this.handleInputChange("password2")}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          {passwordError.password2 ? (
            <p className={classes.error}>{passwordError.password2}</p>
          ) : null}
          {generalErr ? <p className={classes.error}>{generalErr}</p> : null}
        </form>

        <div className={classes.imgUploadContainer}>
          <ImgUpload updateImg={this.handleProfileImg} />
          <div className={classes.buttonContainer}>
            <CustomButton
              primary
              handleClick={this.registerUser}
              disabled={
                !firstname ||
                !lastname ||
                !username ||
                !password ||
                !password2 ||
                !email
              }
            >
              Register
            </CustomButton>
            <p className="or_seperator">or</p>
            <CustomButton secondary handleClick={this.props.cycleLoginSignup}>
              Login
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  signupErrors: PropTypes.object.isRequired,
  clearSignupErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signupErrors: state.auth.signupErrors
});

export default connect(
  mapStateToProps,
  { registerUser, clearSignupErrors }
)(withStyles(styles)(withRouter(Signup)));
