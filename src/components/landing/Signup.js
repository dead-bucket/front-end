import React, { Component } from "react";
import PropTypes from "prop-types";
import signupStyles from "./Signup_styles";
import textFieldStyles from "../common/styles/TextField_styles";
import Button from "../common/Button";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Signup extends Component {
  state = {
    passwordVisible: false
  };
  togglePasswordMask = () => {
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
      signupErrors,
      cycleLoginSignup
    } = this.props;
    const { passwordVisible } = this.state;
    const { usernameErr, emailErr, generalErr } = signupErrors;
    // console.log("This is signupErrors ", signupErrors);
    return (
      <div tabIndex={-1} className="landing__signupContainer">
        <p className={classes.loginTitle}>Create Account</p>
        <form className={classes.form} autoComplete="off">
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-firstname"
              label="First name"
              required
              autoComplete="given-name"
              className={classes.inputStyle}
              value={firstname}
              onChange={this.props.updateFields("firstname")}
              margin="dense"
              variant="outlined"
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
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-lastname"
              label="Last name"
              required
              autoComplete="family-name"
              className={classes.inputStyle}
              value={lastname}
              onChange={this.props.updateFields("lastname")}
              margin="dense"
              variant="outlined"
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
            {usernameErr ? (
              <p className={classes.error}>{usernameErr}</p>
            ) : null}
          </div>

          <div className={classes.inputContainer}>
            <TextField
              id="signup-outlined-email"
              label="Email"
              required
              type="email"
              autoComplete="email"
              className={classes.inputStyle}
              value={email}
              onChange={this.props.updateFields("email")}
              margin="dense"
              variant="outlined"
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
              autoComplete="new-password"
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
            <p className="or_seperator">or</p>
            <Button secondary handleClick={cycleLoginSignup}>
              Login
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

const styles = { ...signupStyles, ...textFieldStyles };

export default withStyles(styles)(Signup);
