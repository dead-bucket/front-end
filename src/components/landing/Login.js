import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { loginUser } from "../../_actions/authActions";
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
    width: 350
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
    this.setState({
      [name]: event.target.value
    });
  };

  // this.props.history.push("/dashboard");
  loginUser = () => {
    const { username, password } = this.state;

    const loginData = {
      username,
      password
    };
    console.log("loginData:", loginData);
    this.props.loginUser(loginData, this.props.history);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.loginSignupContainer}>
        <h1>Welcome to Thoughtline</h1>
        <Card className={classes.loginCard}>
          <p>Login to your Thoughtline</p>
          <form className={classes.container} autoComplete="off">
            <p>* = required field</p>

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
            <div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.loginUser}
              >
                Login
              </Button>
            </div>
          </form>
          <Link to="/signup">Need an account?</Link>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(withRouter(Login)));
