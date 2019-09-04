import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import PropTypes from "prop-types";
import loginStyles from "./Login_styles";
import signupStyles from "./Signup_styles";
import Button from "../common/Button";
import {isEmail} from "../../utils/validation";
import landingStyles from "./LandingPage_styles";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import API from "../../utils/API";
const logoPrimary = require("../common/thoughtline-logo-primary.svg");

class SendPasswordReset extends Component {
 constructor(props){
   super(props);
   this.state = {
    email: '',
    emailValid: false,
    showSuccess: false,
    seconds: 0,
   }
   
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      this.setState({emailValid: isEmail(this.state.email) });
    })
  };

  
  sendUserName = () => {
    console.log('email', this.state.email)
    return axios
      .get(API + `/api/v1/sendusername/${this.state.email}`)
        .then(data => {
          if(data.status === 200) {
            this.setState({showSuccess: true, seconds: 10, errorMessage: false});
            setTimeout(() => {
              this.setState({redirect: "/"})
            }, 5000);
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({errorMessage: true, emailValid: false})
        });
  }
  sendPasswordReset = () => {
    let body = {email: this.state.email}
    return axios
      .post(API + "/api/v1/createpasswordemail", body)
        .then(data => {
          console.log('data from post', data)
          if(data.status === 201) {
            this.setState({showSuccess: true, seconds: 10, errorMessage: false});
            setTimeout(() => {
              this.setState({redirect: "/"})
            }, 5000);
            
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({errorMessage: true, emailValid: false})
        })
  }

  sendRequest = () => {
    console.log('props.type', this.props.type)
    if(this.props.type === 'password') {
      this.sendPasswordReset();
    };
    if(this.props.type === 'username') {
      this.sendUserName();
    };
  };
  
  
  
  

 render(){
 
   if(this.state.redirect) {
     return <Redirect to={this.state.redirect} />
   };
   let successMessage, errorMessage;
   if (this.props.type === 'password') {
    successMessage = (<div className={this.props.classes.resetMessages}>
    A reset email has been sent to: {this.state.email}, you will be redirected soon.
    If you are not automatically redirected click here <a href="/">login</a>
  </div>)  
   } else {
    successMessage = (<div className={this.props.classes.resetMessages}>
    A email has been sent to: {this.state.email}, with your username. You will be redirected soon.
    If you are not automatically redirected click here <a href="/">login</a>
  </div>)  
   }
   if(this.state.errorMessage) {
     errorMessage = (<div className={this.props.classes.resetMessages}>
     {this.state.email}, is not registered on Thoughtline. Please enter a valid address.</div>)
   }
   const {classes} = this.props;
   return(
    <div>
    
    <div  className="roger-test">
    <div className={classes.logoContainer}>
    <img
              src={logoPrimary}
              alt="Thoughtline logo"
              className={classes.logo}
            />
    </div>
    <p className={classes.title1} >Thoughtline</p>
    <p className={classes.titleSmallReset}>{this.props.headingText}</p>
    
      <div className={classes.resetContainer}>
      <TextField
            id="login-outlined-password1-input"
            label="email"
            autoComplete="email"
            className={classes.inputStyleEmail}
            type="text"
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
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            variant="outlined"
            />
      <Button 
        text={'Enter email address'}
        
        handleClick={() => this.sendRequest()}
        primary
        disabled = { !this.state.emailValid}
        >{this.props.buttonText}</Button>
      { this.state.showSuccess ? successMessage : null}
      { this.state.errorMessage ? errorMessage : null}
      </div>
        
        
        

    
  </div>
          </div>
   );
 }
}
SendPasswordReset.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = {...landingStyles, ...loginStyles, ...signupStyles};

export default withStyles(styles)(SendPasswordReset);