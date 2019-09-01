import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Button from "../common/Button";
import loginStyles from "./Login_styles";
import textFieldStyles from "../common/styles/TextField_styles";

//REDUX
import { connect } from "react-redux";
import { loginUser, clearLoginErrors } from "../../_actions/authActions";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";

import InputAdornment from "@material-ui/core/InputAdornment";
// import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// const notificationPic = require("../common/notification.png");
class Login extends Component {
  state = {
    username: "",
    password: "",
    passwordVisible: false
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };
  loginUser = () => {
    this.props.clearLoginErrors();
    const { username, password } = this.state;
    const loginData = {
      username: username.toLowerCase(),
      password
    };
    this.props.loginUser(loginData, this.props.history);
  };
  render() {
    const { classes, loginErrors } = this.props;
    const { usernameErr, passwordErr, generalErr } = loginErrors;
    const { username, password, passwordVisible } = this.state;
    return (
      <div
        tabIndex={-1}
        className={classes.loginSignupContainer}
        // onKeyDown={e => (e.key === "Enter" ? this.loginUser() : null)}
      >
        <p className={classes.loginTitle}>Login</p>
        <form className={classes.form} autoComplete="off">
          <TextField
            id="login-outlined-email"
            label="Username"
            autoComplete="username"
            className={classes.inputStyle}
            value={this.state.username}
            onChange={this.handleInputChange("username")}
            margin="normal"
            variant="outlined"
            // floatingLabelFocusStyle={classes.floatingLabel}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
            }}
          />
          {usernameErr ? <p className={classes.error}>{usernameErr}</p> : null}
          <TextField
            id="login-outlined-password1-input"
            label="Password"
            autoComplete="current-password"
            className={classes.inputStyle}
            type={passwordVisible ? "text" : "password"}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePasswordMask}>
                    {passwordVisible ? (
                      <Visibility className={classes.passwordEye} />
                    ) : (
                      <VisibilityOff className={classes.passwordEye} />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={this.state.password}
            onChange={this.handleInputChange("password")}
            margin="normal"
            variant="outlined"
          />
          {passwordErr ? <p className={classes.error}>{passwordErr}</p> : null}

          {generalErr ? <p className={classes.error}>{generalErr}</p> : null}
        </form>
          <a className={classes.forgotpassword} href={'/reset'}>forgot password</a>
        <div className={classes.buttonContainer}>
          <br />
          <Button
            primary
            handleClick={this.loginUser}
            disabled={!username || !password}
          >
            Login
          </Button>
          <p className="or_seperator">or</p>
          <Button secondary handleClick={this.props.cycleLoginSignup}>
            Create Account
          </Button>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginErrors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearLoginErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loginErrors: state.auth.loginErrors
});

const styles = { ...loginStyles, ...textFieldStyles };
export default connect(
  mapStateToProps,
  { loginUser, clearLoginErrors }
)(withStyles(styles)(withRouter(Login)));
