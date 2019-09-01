import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import signupStyles from "./Signup_styles";
import textFieldStyles from "../common/styles/TextField_styles";
import Button from "../common/Button";
import {passwordMatch} from "../../utils/validation";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import API from "../../utils/API";


class PasswordReset extends Component {
 constructor(props){
   super(props);
   this.state = {
    password1: '',
    password2: '',
    passwordVisible: true,
    passwordMatch: false,
   }
   this.handleChange = this.handleChange.bind(this);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      this.setState({passwordMatch: passwordMatch(this.state.password1, this.state.password2)});
    })
  };

  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
  componentDidMount = () => {
  
    this.setState({
      email: this.getUrlParameter('email'),
      token: this.getUrlParameter('t'),
    }, () => this.checkTokenValid());
  }
  componentWillUnmount = () => {
    
  }
  submitReset = () => {
    let body = {
      email: this.state.email,
      password: this.state.password1,
      token: this.state.token,
    }
    return axios
      .put(API + "/api/v1/acceptnewpassword/", body)
        .then(result => {
          console.log('result from submit', result.status);
          if(result.status === 204) {
            this.setState({redirect: "/"})
          }
        })
        .catch(err => {
          this.setState({redirect: "/error"})
        });
   
  }
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };
  checkTokenValid = () => {
    let body = {
      
        email: this.state.email,
        token: this.state.token,
      
    }
    console.log(body)
    return axios
     .post(API + "/api/v1/acceptnewpassword/", body
     )
     .then(data => console.log(data))
     .catch(err => {
       this.setState({redirect: "/error"});
     })
  }

 render(){
  //  if(this.state.email && this.state.token) {
  //    this.checkTokenValid();
  //  }
  //  if(!this.state.email || !this.state.token) {
  //    return <Redirect to="/" />
  //  };
   if(this.state.redirect) {
     return <Redirect to={this.state.redirect} />
   };
  
   const {classes} = this.props;
   return(
    <div tabIndex={-1} className="landing__signupContainer">
    <p className={classes.loginTitle}>Reset Password</p>
    {/* <form className={classes.form} autoComplete="off"> */}
      <div className={classes.inputContainer}>
        <TextField
          id="signup-outlined-password1-input"
          label="Password"
          autoComplete="current-password"
          className={classes.inputStyle}
          type="text"
          required
          value={this.state.password1}
          onChange={this.handleChange("password1")}
          margin="dense"
          variant="outlined"
        />
        {/* {passwordError.password ? (
          <p className={classes.error}>{passwordError.password}</p>
        ) : null} */}
      </div>
      <div className={classes.inputContainer}>
        <TextField
          id="signup-outlined-password2-input"
          label="Confirm Password"
          autoComplete="new-password"
          className={classes.inputStyle}
          type={this.state.passwordVisible ? "text" : "password"}
          required
          value={this.state.password2}
          onChange={this.handleChange('password2')}
          margin="dense"
          variant="outlined"
        />
        {/* {passwordError.password2 ? (
          <p className={classes.error}>{passwordError.password2}</p>
        ) : null}
        {generalErr ? <p className={classes.error}>{generalErr}</p> : null} */}
        <Button 
          handleClick={() => this.submitReset()}
          primary
          disabled = { !this.state.passwordMatch}
        >Submit</Button>
      </div>
    {/* </form> */}

    
  </div>
   );
 }
}
PasswordReset.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = {...signupStyles, ...textFieldStyles};
export default withStyles(styles)(PasswordReset);