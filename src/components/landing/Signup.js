import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Button from "../common/Button";
import ImgUpload from "../common/ImgUpload";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
  inputContainer: {
    height: "100px",
    // border: "1px solid black",
    width: 310,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  adornmentIcon: {
    padding: 0
  },
  inputStyle: {
    width: "100%"
  },

  error: {
    color: "white",
    fontSize: 14,
    margin: 0
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
    passwordError: "",
    passwordVisible: false
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

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
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
      password2,
      passwordVisible
    } = this.state;

    return (
      <div
        tabIndex={-1}
        className="landing__signupContainer"
        // className={classes.signupContainer}
        // onKeyDown={e => (e.key === "Enter" ? this.registerUser() : null)}
      >
        <form className={classes.form} autoComplete="off">
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-firstname"
              label="First name"
              required
              autoComplete="firstname"
              className={classes.inputStyle}
              value={this.state.firstname}
              onChange={this.handleInputChange("firstname")}
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-lastname"
              label="Last name"
              required
              autoComplete="lastname"
              className={classes.inputStyle}
              value={this.state.lastname}
              onChange={this.handleInputChange("lastname")}
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-username"
              label="Username"
              required
              autoComplete="username"
              className={classes.inputStyle}
              value={this.state.username}
              onChange={this.handleInputChange("username")}
              margin="dense"
              variant="outlined"
            />
            {usernameErr ? (
              <p className={classes.error}>{usernameErr}</p>
            ) : null}
          </div>

          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-email"
              label="Email"
              required
              autoComplete="email"
              className={classes.inputStyle}
              value={this.state.email}
              onChange={this.handleInputChange("email")}
              margin="dense"
              variant="outlined"
            />
            {passwordError.email ? (
              <p className={classes.error}>{passwordError.email}</p>
            ) : null}
            {emailErr ? <p className={classes.error}>{emailErr}</p> : null}
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-password1-input"
              label="Password"
              autoComplete="current-password"
              className={classes.inputStyle}
              type={passwordVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.togglePasswordMask}>
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
              value={this.state.password1}
              onChange={this.handleInputChange("password")}
              margin="dense"
              variant="outlined"
            />
            {passwordError.password ? (
              <p className={classes.error}>{passwordError.password}</p>
            ) : null}
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-password2-input"
              label="Confirm Password"
              autoComplete="current-password"
              className={classes.inputStyle}
              type={passwordVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.togglePasswordMask}>
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
              value={this.state.password2}
              onChange={this.handleInputChange("password2")}
              margin="dense"
              variant="outlined"
            />
            {passwordError.password2 ? (
              <p className={classes.error}>{passwordError.password2}</p>
            ) : null}
            {generalErr ? <p className={classes.error}>{generalErr}</p> : null}
          </div>
        </form>

        <div className={classes.imgUploadContainer}>
          <ImgUpload updateImg={this.handleProfileImg} />
          <div className={classes.buttonContainer}>
            <Button
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
            </Button>
            <p className="or_seperator">or</p>
            <Button secondary handleClick={this.props.cycleLoginSignup}>
              Login
            </Button>
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
