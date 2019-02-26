import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
// MaterialUI
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//Redux
// import { connect } from "react-redux";

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column"
  }
};

class UpdateUser extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { userData, classes } = this.props;
    let formContent;
    console.log("userData: ", userData);
    if (!userData) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <div className={classes.formContainer}>
          {userData.firstname}
          <TextField
            id="outlined-firstname"
            name="firstname"
            // className={classes.textField}
            placeholder={userData.firstname || "First name"}
            value={this.state.firstname}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-lastname"
            name="lastname"
            // className={classes.textField}
            placeholder={userData.lastname || "Last name"}
            value={this.state.lastname}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-username"
            name="username"
            // className={classes.textField}
            placeholder={userData.username}
            value={this.state.username}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-email"
            name="email"
            // className={classes.textField}
            placeholder={userData.email}
            value={this.state.email}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    }
    return <form autoComplete="off">{formContent}</form>;
  }
}

// const mapStateToProps = state => ({
//   currentUser: state.auth.currentUser
// });

UpdateUser.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(UpdateUser);
// connect(mapStateToProps)(withStyles(styles)(UpdateUser));
