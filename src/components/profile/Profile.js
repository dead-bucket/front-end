import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Custom components
import ProfileCard from "./ProfileCard";
import ImgUpload from "../common/ImgUpload";
import Spinner from "../common/Spinner";
import { passwordMatch, signupValidate, isEmpty } from "../../utils/validation";

// REDUX
import { connect } from "react-redux";
import { loadUser } from "../../_actions/authActions";

// Material UI
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckCircle from "@material-ui/icons/CheckCircleOutlined";

const styles = theme => ({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "91vh",
    width: "100vw"
  },
  updateContainer: {
    width: "90%",
    textAlign: "left"
  },
  updateComponents: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    borderTop: "1px solid darkgrey"
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
    fontSize: 10
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
    errors: {},
    msgColor: "",
    successMsg: "",
    errMsg: ""
  };

  handleProfileImg = image => {
    this.setState({ image });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateUserDetails = () => {
    const { username, firstname, lastname, email, image } = this.state;

    const updateData = {
      username,
      firstname,
      lastname,
      email,
      image,
      password: "placeholder"
    };

    const validatedDetails = signupValidate(updateData, "placeholder");
    console.log(validatedDetails);
    console.log(updateData);
  };

  updateUserPassword = () => {
    const { password, newPassword1, newPassword2 } = this.state;
    const { email } = this.props.currentUser;
    const passwordData = { email, password: newPassword1 };
    const passwordIsValid = signupValidate(passwordData, newPassword2);
    console.log(passwordIsValid);
    if (isEmpty(passwordIsValid)) {
      const passwordUpdate = {
        newpassword: newPassword1,
        oldpassword: password
      };

      axios
        .put("/api/v1/changepassword", passwordUpdate)
        .then(data =>
          this.setState({
            successMsg: "Password Successfully Updated!",
            errMsg: "",
            msgColor: "green"
          })
        )
        .catch(err =>
          this.setState({
            errMsg: {
              currentPassword: "Error.  Please enter your current password."
            },
            msgColor: "red",
            successMsg: ""
          })
        );
    } else {
      this.setState({
        errMsg: passwordIsValid,
        msgColor: "red",
        successMsg: ""
      });
    }

    console.log(passwordData);
  };

  componentDidMount() {
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
      successMsg,
      msgColor
    } = this.state;

    const changePasswordEnabled =
      password.length > 0 && newPassword1.length > 0 && newPassword2.length > 0;

    const updateProfileEnabled =
      firstname.length > 0 ||
      lastname.length > 0 ||
      username.length > 0 ||
      email.length > 0 ||
      image.length > 0;

    let userProfile, updateForm;
    if (!currentUser) {
      userProfile = <Spinner />;
      updateForm = <Spinner />;
    } else {
      userProfile = <ProfileCard user={currentUser} />;
      updateForm = (
        <div className={classes.formContainer}>
          <TextField
            id="outlined-firstname"
            label="First name"
            name="firstname"
            // className={classes.textField}
            placeholder={currentUser.firstname || "No first name"}
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
            placeholder={currentUser.lastname || "No last name"}
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
            placeholder={currentUser.username}
            value={this.state.username}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-email"
            label="Email"
            name="email"
            // className={classes.textField}
            placeholder={currentUser.email}
            value={this.state.email}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    }
    return (
      <div className={classes.profileContainer}>
        <h4 style={{ textAlign: "center", fontFamily: "Satisfy, cursive" }}>
          Your Profile:
        </h4>
        <div>{userProfile}</div>
        <div className={classes.updateContainer}>
          <p>Update Profile Information:</p>
          <div className={classes.updateComponents}>
            <ImgUpload updateImg={this.handleProfileImg} />
            <div>
              <p className={classes.updateSubHead}>Update your details:</p>
              {updateForm}
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
            {successMsg ? (
              <div className={classes.successMsg}>
                <CheckCircle style={{ color: msgColor }} />
                <h5 style={{ color: msgColor }}>{successMsg}</h5>
              </div>
            ) : null}
            <div className={classes.formContainer}>
              <TextField
                id="outlined-firstname"
                label="Current Password"
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
                id="outlined-lastname"
                name="newPassword1"
                label="New Password"
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
                id="outlined-username"
                name="newPassword2"
                label="Confirm New Password"
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
              <Button
                id="AddFriendModal_submit_btn"
                variant="contained"
                color="secondary"
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
