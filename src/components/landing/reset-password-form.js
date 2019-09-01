import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import PropTypes from "prop-types";
import loginStyles from "./Login_styles";
import signupStyles from "./Signup_styles";
import textFieldStyles from "../common/styles/TextField_styles";
import Button from "../common/Button";
import {passwordMatch, isEmail} from "../../utils/validation";
import Navbar from "../common/NavBar";
import landingStyles from "./LandingPage_styles";
import Clock from "react-countdown-clock";
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

  
  
  sendPasswordReset = () => {
    let body = {email: this.state.email}
    return axios
      .post(API + "/api/v1/createpasswordemail", body)
        .then(data => {
          console.log('data from post', data)
          if(data.status === 201) {
            this.setState({showSuccess: true, seconds: 10});
            setTimeout(() => {
              this.setState({redirect: "/"})
            }, 5000);
            
          }
        })
        .catch(err => console.log(err))
  }
  
  
  
  

 render(){
 
   if(this.state.redirect) {
     return <Redirect to={this.state.redirect} />
   };
  
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
    <p className={classes.smallTitle}>Reset Password</p>
    {/* <form className={classes.form} autoComplete="off"> */}
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
        
        handleClick={() => this.sendPasswordReset()}
        primary
        disabled = { !this.state.emailValid}
        >Send Reset Link</Button>
      { this.state.showSuccess ? 
          <div style={{fontSize: 12, marginTop: "6%", textAlign: "center"}}>
            A reset email has been sent to: {this.state.email}, you will be redirected soon.
            If you are not automatically redirected click here <a href="/">login</a>
          </div>
          : null}
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