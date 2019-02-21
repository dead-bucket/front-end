import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { loginUser } from "../../_actions/authActions";
// import { CLEAR_LOGIN_ERRORS } from "../../_actions/types";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = {
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
  errorMsg: {
    color: "red"
  }
};

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
    // this.props.dispatch({
    //   type: CLEAR_LOGIN_ERRORS,
    //   payload: null
    // });
    this.setState({
      [name]: event.target.value
    });
  };

  loginUser = () => {
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
        <h1>Welcome to Thoughtline</h1>
        <Card className={classes.loginCard}>
          <h4>Login</h4>
          <form autoComplete="off">
            <TextField
              id="outlined-email"
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

            <p style={{ margin: "0px" }}>* = required</p>
            {usernameErr ? (
              <p className={classes.errorMsg}>{usernameErr}</p>
            ) : null}

            {passwordErr ? (
              <p className={classes.errorMsg}>{passwordErr}</p>
            ) : null}
            {generalErr ? (
              <p className={classes.errorMsg}>{generalErr}</p>
            ) : null}
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
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loginErrors: state.auth.loginErrors
});

// const mapDispatchToProps = (dispatch)=>{

//   return bindActionCreators({ getApplications: getApplications },dispatch)
// }

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(withRouter(Login)));
