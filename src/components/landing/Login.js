import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { loginUser, clearLoginErrors } from "../../_actions/authActions";

// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  titleDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    // paddingLeft: theme.spacing.unit
    // marginRight: theme.spacing.unit
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
  loginCard: {
    marginTop: 50,
    padding: 20,
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%"
  },
  error: {
    color: "red",
    fontSize: "10px",
    margin: 0
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
      password2: ""
    };
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  loginUser = () => {
    this.props.clearLoginErrors();
    const { username, password } = this.state;

    const loginData = {
      username,
      password
    };
    this.props.loginUser(loginData, this.props.history);
  };

  render() {
    const { classes, loginErrors } = this.props;
    const { usernameErr, passwordErr, generalErr } = loginErrors;
    const { username, password } = this.state;

    return (
      <div
        tabIndex={-1}
        className={classes.loginSignupContainer}
        onKeyDown={e => (e.key === "Enter" ? this.loginUser() : null)}
      >
        <p style={{ marginTop: "10%", marginBottom: 0 }}>Welcome to</p>
        <div className={classes.titleDiv}>
          <h1 className={classes.title}>Thoughtline </h1>
          <img className={classes.titleImg} src={notificationPic} alt="logo" />
        </div>
        <Card className={classes.loginCard}>
          <h4 style={{ margin: 0 }}>Login</h4>
          <form className={classes.form} autoComplete="off">
            <TextField
              id="outlined-email"
              label="Username"
              required
              fullWidth
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChange("username")}
              margin="normal"
              variant="outlined"
            />
            {usernameErr ? (
              <p className={classes.error}>{usernameErr}</p>
            ) : null}
            <TextField
              id="outlined-password1-input"
              label="Password"
              className={classes.textField}
              type="password"
              fullWidth
              required
              value={this.state.password1}
              onChange={this.handleInputChange("password")}
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />
            {passwordErr ? (
              <p className={classes.error}>{passwordErr}</p>
            ) : null}
            <p style={{ margin: "0px" }}>* = required</p>

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
          <br />

          <Link to="/signup">
            <Button color="primary" variant="outlined">
              Create An Account
            </Button>
          </Link>
        </Card>
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
