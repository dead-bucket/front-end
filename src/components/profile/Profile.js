import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Custom components
import NavBar from "../common/NavBar";
import ProfileCard from "./ProfileCard";
import ImgUpload from "../common/ImgUpload";
import Spinner from "../common/Spinner";
import { signupValidate, isEmpty } from "../../utils/validation";
import API from "../../utils/API";

// REDUX
import { connect } from "react-redux";
import { loadUser } from "../../_actions/authActions";

// Material UI
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckCircle from "@material-ui/icons/CheckCircleOutlined";

const styles = theme => ({
  navbar: {
    position: "fixed",
    top: 0,
    left: 0
  },
  mainTitle: {
    textAlign: "center",
    fontFamily: "Satisfy, cursive",
    marginBottom: 0,
    fontSize: "1.75rem"
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "92vh",
    width: "100vw",
    overflow: "scroll"
  },
  updateContainer: {
    width: "90%",
    textAlign: "left"
  },
  updateComponents: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid darkgrey"
  },
  updateDiv: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  passwordComponents: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    borderTop: "1px solid darkgrey",
    marginBottom: 50
  },

  updateSubHead: {
    marginBottom: 0
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: 200
  },
  errMsg: {
    margin: 0,
    width: "100%",
    textAlign: "left",
    fontSize: 14
  },
  successMsg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Profile extends Component {
  state = {
    image: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    newPassword1: "",
    newPassword2: "",
    msgColor: "",
    passwordSuccess: "",
    profileSuccess: "",
    errMsg: {},
    updatePasswordButtonColor: "secondary"
  };

  handleProfileImg = image => {
    this.setState({ image });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateUserDetails = () => {
    // IMAGE IS Working

    const {
      username,
      firstname,
      lastname,
      email,
      image,
    } = this.state;

    const updateData = {
      username,
      firstname,
      lastname,
      email,
      image
    };

    const validatedDetails = signupValidate(
      {
        ...updateData,
        email: email ? email : "placeholder@email.com",
        password: "placeholder"
      },
      "placeholder"
    );

    if (isEmpty(validatedDetails)) {
      axios
        .put(API + "/api/v1/user", updateData)
        .then(data => {
          this.setState({
            msgColor: "green",
            profileSuccess: "Profile Updated!",
            errMsg: {}
          })
        })
        .then(() => {
          this.props.loadUser();
          console.log('user reloaded');

        })
        .catch(err => {
          const { data } = err.response;
          if (data.includes("username")) {
            this.setState({
              errMsg: {
                username: "That username already in use. Please try again."
              },
              msgColor: "red",
              profileSuccess: ""
            });
          }
          if (data.includes("email")) {
            this.setState({
              errMsg: {
                email: "That email is already in use. Please try again."
              },
              msgColor: "red",
              profileSuccess: ""
            });
          }
        });
    } else {
      this.setState({
        errMsg: validatedDetails,
        msgColor: "red",
        passwordSuccess: ""
      });
    }
  };

  updateUserPassword = () => {
    const { password, newPassword1, newPassword2 } = this.state;
    const { email } = this.props.currentUser;
    const passwordData = { email, password: newPassword1 };
    const passwordIsValid = signupValidate(
      passwordData,
      newPassword2,
      password
    );
    // console.log(passwordIsValid);
    if (isEmpty(passwordIsValid)) {
      const passwordUpdate = {
        newpassword: newPassword1,
        oldpassword: password
      };
      // console.log('in password update', passwordUpdate);
      axios
        .put(API + "/api/v1/changepassword", passwordUpdate)
        .then(data => {
          this.setState({
            passwordSuccess: "Password Updated!",
            errMsg: {},
            msgColor: "green",
            password: "",
            newPassword1: "",
            newPassword2: ""
          });
        })
        .catch(err =>
          this.setState({
            errMsg: {
              currentPassword: "Error.  Please enter your current password."
            },
            msgColor: "red",
            passwordSuccess: ""
          })
        );
    } else {
      this.setState({
        errMsg: passwordIsValid,
        msgColor: "red",
        passwordSuccess: ""
      });
    }
  };

  componentDidMount() {
    this.props.loadUser();
  }
  componentDidUpdate() {
    this.props.loadUser();
  }

  render() {
    const { classes, currentUser } = this.props;
    const {
      username,
      firstname,
      lastname,
      email,
      image,
      password,
      newPassword1,
      newPassword2,
      errMsg,
      passwordSuccess,
      profileSuccess,
      msgColor
      // updatePasswordButtonColor,
    } = this.state;

    const changePasswordEnabled =
      password.length > 0 && newPassword1.length > 0 && newPassword2.length > 0;

    const updateProfileEnabled =
      firstname.length > 0 ||
      lastname.length > 0 ||
      username.length > 0 ||
      email.length > 0 ||
      image.length > 0;

    let userProfile, formData;
    if (!currentUser) {
      userProfile = <Spinner />;
      formData = {
        email: "Email",
        firstname: "First Name",
        lastname: "Last Name",
        username: "Username"
      };
    } else {
      console.log('about ti send to Profile card current user', currentUser);
      userProfile = <ProfileCard user={currentUser} />;
      formData = currentUser;
    }
    return (
      <div style={{ position: "relative" }}>
        <NavBar className={classes.navbar} />
        <div className={classes.profileContainer}>
          <p className={classes.mainTitle}>Your Profile:</p>
          <div>{userProfile}</div>
          <div className={classes.updateContainer}>
            <p>Update Profile Information:</p>
            <div className={classes.updateComponents}>
              {profileSuccess ? (
                <div className={classes.successMsg}>
                  <CheckCircle style={{ color: msgColor }} />
                  <h5 style={{ color: msgColor }}>{profileSuccess}</h5>
                </div>
              ) : null}
              <div className={classes.updateDiv}>
                <ImgUpload updateImg={this.handleProfileImg} />
                <div>
                  <p className={classes.updateSubHead}>Update your details:</p>
                  <div className={classes.formContainer}>
                    <TextField
                      id="outlined-firstname"
                      label="First name"
                      name="firstname"
                      autoComplete="off"
                      // className={classes.textField}
                      placeholder={formData.firstname}
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-lastname"
                      label="Last name"
                      name="lastname"
                      // className={classes.textField}
                      placeholder={formData.lastname}
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-username"
                      label="Username"
                      name="username"
                      // className={classes.textField}
                      placeholder={formData.username}
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                    />{" "}
                    {errMsg.username ? (
                      <p style={{ color: msgColor }} className={classes.errMsg}>
                        {errMsg.username}
                      </p>
                    ) : null}
                    <TextField
                      id="outlined-email"
                      label="Email"
                      name="email"
                      // className={classes.textField}
                      placeholder={formData.email}
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                    />
                    {errMsg.email ? (
                      <p style={{ color: msgColor }} className={classes.errMsg}>
                        {errMsg.email}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <Button
            id="AddFriendModal_submit_btn"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.updateUserDetails}
            disabled={!updateProfileEnabled}
          >
            Update Account Information
          </Button>
          <br />
          {/* PASSWORD RESET */}
          <div className={classes.updateContainer}>
            <p>Change Your Password:</p>
            <div className={classes.passwordComponents}>
              {passwordSuccess ? (
                <div className={classes.successMsg}>
                  <CheckCircle style={{ color: msgColor }} />
                  <h5 style={{ color: msgColor }}>{passwordSuccess}</h5>
                </div>
              ) : null}
              <div className={classes.formContainer}>
                <form autoComplete="off">
                  <TextField
                    id="outlined-current-password"
                    label="Current Password"
                    autoComplete="off"
                    name="password"
                    // className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    margin="normal"
                    type="password"
                    variant="outlined"
                  />
                  {errMsg.currentPassword ? (
                    <p style={{ color: msgColor }} className={classes.errMsg}>
                      {errMsg.currentPassword}
                    </p>
                  ) : null}
                  <TextField
                    id="outlined-new-password"
                    name="newPassword1"
                    label="New Password"
                    autoComplete="off"
                    // className={classes.textField}
                    value={this.state.newPassword1}
                    onChange={this.handleInputChange}
                    margin="normal"
                    type="password"
                    variant="outlined"
                  />
                  {errMsg.password ? (
                    <p style={{ color: msgColor }} className={classes.errMsg}>
                      {errMsg.password}
                    </p>
                  ) : null}
                  <TextField
                    id="outlined-confirm-password"
                    name="newPassword2"
                    label="Confirm New Password"
                    autoComplete="off"
                    value={this.state.newPassword2}
                    onChange={this.handleInputChange}
                    margin="normal"
                    type="password"
                    variant="outlined"
                  />
                  {errMsg.password2 ? (
                    <p style={{ color: msgColor }} className={classes.errMsg}>
                      {errMsg.password2}
                    </p>
                  ) : null}
                  <br />
                </form>
                <br />
                <Button
                  id="AddFriendModal_submit_btn"
                  variant="contained"
                  color={
                    newPassword1 === newPassword2 ? "primary" : "secondary"
                  }
                  className={classes.button}
                  onClick={this.updateUserPassword}
                  disabled={!changePasswordEnabled}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { loadUser }
)(withStyles(styles)(Profile));
