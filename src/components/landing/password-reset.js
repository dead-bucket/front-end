import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import PropTypes from "prop-types";
import loginStyles from "./Login_styles";
import signupStyles from "./Signup_styles";
import Button from "../common/Button";
import { passwordMatch } from "../../utils/validation";
import landingStyles from "./LandingPage_styles";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import API from "../../utils/API";
const logoPrimary = require("../common/thoughtline-logo-primary.svg");

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: "",
      password3: "",
      passwordVisible: true,
      passwordMatch: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        this.setState({
          passwordMatch: passwordMatch(
            this.state.password1,
            this.state.password2
          )
        });
      }
    );
  };

  getUrlParameter = name => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  componentDidMount = () => {
    this.setState(
      {
        email: this.getUrlParameter("email"),
        token: this.getUrlParameter("t")
      },
      () => this.checkTokenValid()
    );
  };

  submitReset = () => {
    let body = {
      email: this.state.email,
      password: this.state.password1,
      token: this.state.token
    };
    return axios
      .put(API + "/api/v1/acceptnewpassword/", body)
      .then(result => {
        if (result.status === 204) {
          this.setState({ redirect: "/" });
        }
      })
      .catch(err => {
        this.setState({ redirect: "/error" });
      });
  };
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };
  checkTokenValid = () => {
    let body = {
      email: this.state.email,
      token: this.state.token
    };

    return axios
      .post(API + "/api/v1/acceptnewpassword/", body)
      .then(data => console.log(data))
      .catch(err => {
        this.setState({ redirect: "/error" });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { classes } = this.props;
    return (
      <div>
        <div className="roger-test">
          <div className={classes.logoContainer}>
            <img
              src={logoPrimary}
              alt="Thoughtline logo"
              className={classes.logo}
            />
          </div>
          <p className={classes.title1}>Thoughtline</p>
          <p className={classes.smallTitle}>Reset Password</p>
          {/* <form className={classes.form} autoComplete="off"> */}
          <div className={classes.inputContainer}>
            <TextField
              id="login-outlined-password1-input"
              label="Password"
              autoComplete="New Password"
              className={classes.inputStyle}
              type={this.state.passwordVisible ? "text" : "password"}
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
                      {this.state.passwordVisible ? (
                        <Visibility className={classes.passwordEye} />
                      ) : (
                        <VisibilityOff className={classes.passwordEye} />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={this.state.password1}
              onChange={this.handleChange("password1")}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="login-outlined-password2-input"
              label="Password"
              autoComplete="New Password"
              className={classes.inputStyle}
              type={this.state.passwordVisible ? "text" : "password"}
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
                      {this.state.passwordVisible ? (
                        <Visibility className={classes.passwordEye} />
                      ) : (
                        <VisibilityOff className={classes.passwordEye} />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={this.state.password2}
              onChange={this.handleChange("password2")}
              margin="normal"
              variant="outlined"
            />
            {/* {passwordError.password2 ? (
          <p className={classes.error}>{passwordError.password2}</p>
          ) : null}
        {generalErr ? <p className={classes.error}>{generalErr}</p> : null} */}
            <Button
              text={"Enter new password"}
              handleClick={() => this.submitReset()}
              primary
              disabled={!this.state.passwordMatch}
            >
              Reset Password
            </Button>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
PasswordReset.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = { ...landingStyles, ...loginStyles, ...signupStyles };
export default withStyles(styles)(PasswordReset);
