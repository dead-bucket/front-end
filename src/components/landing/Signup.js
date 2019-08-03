import React, { Component } from "react";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";

import Button from "../common/Button";
// import ImgUpload from "../common/ImgUpload";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//REDUX
// import { connect } from "react-redux";
// import { isEmpty, signupValidate } from "../../utils/validation";
// import { registerUser, clearSignupErrors } from "../../_actions/authActions";

const styles = {
  signupContainer: {
    display: "flex",
    flexDirection: "column"
  },
  loginTitle: {
    margin: 0,
    color: "lightskyblue",
    fontSize: "1rem",
    fontWeight: "lighter"
  },
  form: {
    width: "90%",
    maxWidth: 1300,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  imgUploadContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputContainer: {
    height: 80,
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

class Signup extends Component {
  state = {
    passwordVisible: false
  };
  togglePasswordMask = () => {
    console.log("click");
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      password2,
      passwordError,

      classes,
      signupErrors
    } = this.props;
    const { passwordVisible } = this.state;
    const { usernameErr, emailErr, generalErr } = signupErrors;

    return (
      <div tabIndex={-1} className="landing__signupContainer">
        <p className={classes.loginTitle}>Create Account</p>
        <form className={classes.form} autoComplete="off">
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-firstname"
              label="First name"
              required
              autoComplete="firstname"
              className={classes.inputStyle}
              value={firstname}
              onChange={this.props.updateFields("firstname")}
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
              value={lastname}
              onChange={this.props.updateFields("lastname")}
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
              value={username}
              onChange={this.props.updateFields("username")}
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
              value={email}
              onChange={this.props.updateFields("email")}
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
              value={password}
              onChange={this.props.updateFields("password")}
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
              value={password2}
              onChange={this.props.updateFields("password2")}
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
          {/* <ImgUpload updateImg={this.handleProfileImg} /> */}
          <div className={classes.buttonContainer}>
            <Button
              primary
              handleClick={this.props.cycleShowImgUpload}
              disabled={
                !firstname ||
                !lastname ||
                !username ||
                !password ||
                !password2 ||
                !email
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
