import React, { Component } from "react";
import PropTypes from "prop-types";

// Custom components
import ProfileCard from "./ProfileCard";
import ImgUpload from "../common/ImgUpload";
import Spinner from "../common/Spinner";
import { passwordMatch } from "../../utils/validation";

// REDUX
import { connect } from "react-redux";
import { loadUser } from "../../_actions/authActions";

// Material UI
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    flexDirection: "column"
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
    hasChanged: false
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
    const updateData = { username, firstname, lastname, email, image };
    console.log(updateData);
  };

  updateUserPassword = () => {
    const { password, newPassword1 } = this.state;
    const passwordData = {
      password,
      newPassword1
    };
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
      newPassword2
    } = this.state;

    const changePasswordEnabled =
      password.length > 0 &&
      newPassword1.length > 5 &&
      newPassword2.length > 5 &&
      passwordMatch(newPassword1, newPassword2);

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
