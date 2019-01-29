import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ImgUpload from "../common/ImgUpload";

import { registerUser } from "../../_actions/authActions";

const styles = {
  loginSignupContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  signupCard: {
    marginTop: 50,
    padding: 20,
    width: 350
  }
};

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    picture: "",
    password: "",
    password2: ""
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

    const {
      firstname,
      lastname,
      username,
      email,
      password,
      picture
    } = this.state;
    if (!username || !email || !password) {
      console.log("fill out form");
      return;
    }
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
        username,
        email,
        password
      };
    }

    // console.log(signupData);

    this.props.registerUser(signupData, this.props.history);
  };
  // TODO - get rid of ids on TextFields
  render() {
    const { classes } = this.props;

    return (
      <div
        tabIndex={-1}
        className={classes.loginSignupContainer}
        onKeyDown={e => (e.key === "Enter" ? this.registerUser() : null)}
      >
        <h1>Welcome to Thoughtline</h1>
        <Card className={classes.signupCard} onSubmit={this.onCommentSubmit}>
          <p>Create a Thoughtline Account</p>
          <ImgUpload updateImg={this.handleProfileImg} />
          <form autoComplete="off">
            <p>* = required field</p>
            <TextField
              id="outlined-firstname"
              label="First name"
              fullWidth
              // className={classes.textField}
              value={this.state.firstname}
              onChange={this.handleInputChange("firstname")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-lastname"
              label="Lastname"
              fullWidth
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
            <div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.registerUser}
              >
                Signup!
              </Button>
            </div>
          </form>
          <Link to="/">Want to login?</Link>
        </Card>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(withRouter(Signup)));
