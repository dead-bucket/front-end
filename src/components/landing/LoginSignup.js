import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { registerUser, loginUser } from "../../_actions/authActions";

import "./loginSignup.css";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 9 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.paper
  }
});

class LoginSignup extends Component {
  state = {
    value: 0
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      name: "",
      email: "",
      imgLink: "",
      password1: "",
      password2: ""
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // this.props.history.push("/dashboard");
  loginUser = () => {
    const { email, password1 } = this.state;
    const loginData = {
      email,
      password1
    };

    this.props.loginUser(loginData);
  };

  registerUser = () => {
    //         {value === 0 && <TabContainer>{login}</TabContainer>}
    // {value === 1 && <TabContainer>{signUp}</TabContainer>}
    const { name, email, password1 } = this.state;
    const registerData = {
      username: name,
      email,
      password: password1
    };

    this.props.registerUser(registerData, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      // this.setState({ errors: nextProps.errors });
      console.log(
        "Errors in componentWillReceiveProps login/signin",
        nextProps.errors
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const login = (
      <div>
        <p>Login to your Thoughtline account</p>
        <form className={classes.container} autoComplete="off">
          <p>* = required field</p>

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
            value={this.state.password1}
            onChange={this.handleInputChange("password1")}
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
      </div>
    );
    const signUp = (
      <div>
        <p>Create a Thoughtline Account</p>
        <form className={classes.container} autoComplete="off">
          <p>* = required field</p>
          <TextField
            id="outlined-name"
            label="Name"
            required
            fullWidth
            // className={classes.textField}
            value={this.state.name}
            onChange={this.handleInputChange("name")}
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
            value={this.state.password1}
            onChange={this.handleInputChange("password1")}
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
      </div>
    );

    return (
      <div className="z-depth-2" id="landing_loginsignup">
        <Tabs value={value} fullWidth onChange={this.handleChange}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        {value === 0 && <TabContainer>{login}</TabContainer>}
        {value === 1 && <TabContainer>{signUp}</TabContainer>}
      </div>
    );
  }
}

LoginSignup.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(withStyles(styles)(withRouter(LoginSignup)));
