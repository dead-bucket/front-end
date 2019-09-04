import React, { Component } from "react";
import PropTypes from "prop-types";
import signupStyles from "./Signup_styles";
import textFieldStyles from "../common/styles/TextField_styles";
import Button from "../common/Button";
import axios from "axios";
import API from "../../utils/API";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';

class Register extends Component {
  state = {
    passwordVisible: false
  };
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };
  registerSignUp = () => {
    let body = {
      email: this.props.email,
      first: this.props.firstname,
      last: this.props.lastname,
    }
   return axios
    .post(API + `/api/v1/beta`, body)
      .then(results => console.log(results))
      .then(() => this.props.close())
      .catch(err => console.log(err));
  }

  render() {
    const {
      firstname,
      lastname,
      checked,
      email,
      
      passwordError,
      classes,
      signupErrors,
      cycleLoginSignup
    } = this.props;
    
    const { emailErr} = signupErrors;

    return (
      <div tabIndex={-1} className="landing__signupContainer">
        <p className={classes.loginTitle}>Register</p>
        <p className={classes.loginTitle}
            style={{ textAlign: "center" }}
            >Thoughtline's beta test is currently closed
            <br /> please register to be notified once Thoughtline is open.
        </p>
        <form className={classes.formRegister} autoComplete="off">
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
       
          <p className={classes.loginTitle}
              style={{ textAlign: "center" }}
              >I agree to recieve email
              <Radio
              checked={this.props.checked === true}
              onChange={this.props.tick}
              value="d"
              color="default"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'D' }}
            />

          </p>
        </form>

        <div className={classes.imgUploadContainer}>
          <div className={classes.buttonContainer}>
            <Button
              primary
              handleClick={() => this.registerSignUp()}
              disabled={
                !firstname ||
                !lastname ||
                !email ||
                !checked
              }
            >
              Register
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

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = { ...signupStyles, ...textFieldStyles };

export default withStyles(styles)(Register);
