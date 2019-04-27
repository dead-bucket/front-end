import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import ImgUpload from "../common/ImgUpload";
import NavBar from "../common/NavBar";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//REDUX
import { connect } from "react-redux";
import { isEmpty, signupValidate } from "../../utils/validation";
import { registerUser, clearSignupErrors } from "../../_actions/authActions";

const styles = {
  signupContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100
  },
  titleDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "Satisfy, cursive",
    color: "#0058CF",
    flexGrow: 1,
    marginTop: 0
  },
  titleImg: {
    width: 48,
    marginBottom: 60
  },
  loginSignupContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  signupCard: {
    padding: 20,
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  error: {
    color: "red",
    fontSize: 14,
    margin: 0
  }
};

const notificationPic = require("../common/notification.png");

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
      <div className={classes.signupContainer}>
        <NavBar />
        <div
          tabIndex={-1}
          className={classes.loginSignupContainer}
          onKeyDown={e => (e.key === "Enter" ? this.registerUser() : null)}
        >
          <p style={{ marginTop: "50px", marginBottom: 0 }}>Welcome to</p>
          <div className={classes.titleDiv}>
            <h1 className={classes.title}>Thoughtline </h1>
            <img
              className={classes.titleImg}
              src={notificationPic}
              alt="logo"
            />
          </div>
          <Card className={classes.signupCard}>
            <h4 style={{ margin: 0 }}>Create an Account</h4>

            <ImgUpload updateImg={this.handleProfileImg} />

            <form autoComplete="off">
              <TextField
                id="outlined-firstname"
                label="First name"
                fullWidth
                required
                // className={classes.textField}
                value={this.state.firstname}
                onChange={this.handleInputChange("firstname")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-lastname"
                label="Last name"
                fullWidth
                required
                // className={classes.textField}
                value={this.state.lastname}
                onChange={this.handleInputChange("lastname")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-username"
                label="Username"
                required
                fullWidth
                // className={classes.textField}
                value={this.state.username}
                onChange={this.handleInputChange("username")}
                margin="normal"
                variant="outlined"
              />
              {usernameErr ? (
                <p className={classes.error}>{usernameErr}</p>
              ) : null}
              <TextField
                id="outlined-email"
                label="Email"
                required
                fullWidth
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
                id="outlined-password1-input"
                label="Password"
                className={classes.textField}
                type="password"
                fullWidth
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
                id="outlined-password2-input"
                label="Confirm Password"
                className={classes.textField}
                type="password"
                fullWidth
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
              {generalErr ? (
                <p className={classes.error}>{generalErr}</p>
              ) : null}

              <p style={{ margin: 0 }}>*required</p>
              <br />
              <div>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.registerUser}
                  disabled={
                    !firstname ||
                    !lastname ||
                    !username ||
                    !password ||
                    !password2 ||
                    !email
                  }
                >
                  Signup!
                </Button>
              </div>
            </form>
            <br />
            <Button color="primary" variant="outlined">
              <Link to="/">Want to login?</Link>
            </Button>
          </Card>
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
