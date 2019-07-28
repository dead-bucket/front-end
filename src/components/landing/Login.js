import React, { Component } from "react";
import PropTypes from "prop-types";

import { withRouter, Link } from "react-router-dom";
// import NavBar from "../common/NavBar";
//REDUX
import { connect } from "react-redux";
import { loginUser, clearLoginErrors } from "../../_actions/authActions";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";

import InputAdornment from "@material-ui/core/InputAdornment";
// import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const styles = theme => ({
  // titleDiv: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // title: {
  //   fontFamily: "Satisfy, cursive",
  //   color: "#0058CF",
  //   flexGrow: 1,
  //   marginTop: 0
  // },
  // titleImg: {
  //   width: 48,
  //   marginBottom: 60
  // },
  loginSignupContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "400px"
  },
  // loginCard: {
  //   padding: 20,
  //   width: 350,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center"
  // },
  form: {
    width: "90%"
  },
  error: {
    color: "red",
    fontSize: "10px",
    margin: 0
  },
  button: {
    backgroundColor: "lightskyblue"
  },
  inputStyle: {
    width: "100%"
  }
});
const notificationPic = require("../common/notification.png");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      username: "",
      email: "",
      imgLink: "",
      password: "",
      password2: "",
      passwordVisible: false
    };
  }
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
        onKeyDown={e => (e.key === "Enter" ? this.loginUser() : null)}
      >
        {/* <p style={{ marginTop: "50px", marginBottom: 0 }}>Welcome to</p>
          <div className={classes.titleDiv}>
            <h1 className={classes.title}>Thoughtline </h1>
            <img
              className={classes.titleImg}
              src={notificationPic}
              alt="logo"
            />
          </div> */}
        {/* <Card className={classes.loginCard}> */}
        <h6 style={{ margin: 0 }}>Login</h6>
        <form className={classes.form} autoComplete="off">
          <TextField
            id="outlined-email"
            label="Username"
            required
            // fullWidth
            className={classes.inputStyle}
            value={this.state.username}
            onChange={this.handleInputChange("username")}
            margin="normal"
            variant="outlined"
          />
          {usernameErr ? <p className={classes.error}>{usernameErr}</p> : null}
          <TextField
            id="outlined-password1-input"
            label="Password"
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
            // fullWidth

            required
            value={this.state.password1}
            onChange={this.handleInputChange("password")}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          {passwordErr ? <p className={classes.error}>{passwordErr}</p> : null}
          <p style={{ margin: "0px", fontSize: 15 }}>*required</p>
          {generalErr ? <p className={classes.error}>{generalErr}</p> : null}

          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.loginUser}
              disabled={!username || !password}
            >
              Login
            </Button>
          </div>
        </form>
        {/* <br />
            <Link to="/signup">
              <Button color="primary" variant="outlined">
                Create An Account
              </Button>
            </Link> */}
        {/* </Card> */}
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
export default connect(
  mapStateToProps,
  { loginUser, clearLoginErrors }
)(withStyles(styles)(withRouter(Login)));
