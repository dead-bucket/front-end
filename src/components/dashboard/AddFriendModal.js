import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import ImgUpload from "../common/ImgUpload";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  mediumIcon: {
    width: 40,
    height: 40
  },
  addIconStyle: {
    position: "absolute",
    bottom: "5%",
    right: "10%"
  }
});

// // VALIDATE email function
// function validateEmail(email) {
//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

class AddFriendModal extends Component {
  state = {
    open: false,
    username: "",
    email: "",
    image: "",
    isUser: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      username: "",
      email: "",
      image: ""
    });
  };

  handleInputChange = name => event => {
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    const { value } = event.target;
    if (name === "email") {
      console.log('hello im changing email');
      this.setState({
        isUser: false,
      })
      if (validateEmail(value)) {
        axios
          .get("http://localhost:4000/api/v1/usersearch/?email=" + value)
            .then(data => {
              // console.log('i\'m the data back from search', data.data[0].picture);
              if(data.status === 200) {
                this.setState({
                  name: data.data[0].username,
                  image: data.data[0].picture,
                  isUser: true,
                  isUser_id: data.data[0]._id,
                })

              }
            })
            .catch(err => console.log(err));
      }
    }
    this.setState({
      [name]: value
    });
  };

  handleProfileImg = image => {
    this.setState({ image });
  };

  addNewTarget = () => {
    // TODO - validate inputs
    const { username, email, image, isUser } = this.state;
    let newTarget;
    if (!image) {
      newTarget = {
        username,
        email
      };
    } else {
      newTarget = {
        username,
        email,
        image
      };
    }
    if(!isUser) {
      axios
        .post("/api/v1/target/", newTarget)
        .then(data => {
          this.props.refreshTargets();
        })
        .catch(err => console.log(err));

    }
    if(isUser) {
      let friend = {friend:this.state.isUser_id};
      axios
        .put("/api/v1/addfriend", friend)
        .then(data => {
          this.props.refreshTargets();
        })
        .catch(err => console.log(err));

    }
    // TODO - move to actions

    this.handleClose();
  };

  userSearch = term => {
    axios
      .get("/api/v1/usersearch/?email=" + term)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    let displayedImage;
    if (!this.state.isUser) {
      displayedImage = <ImgUpload updateImg={this.handleProfileImg} />;
    } else {
      displayedImage = <img src={this.state.image} />;
    }
    return (
      <div>
        <div onClick={this.handleOpen} className={classes.addIconStyle}>
          <IconButton className={classes.medium}>
            <PersonAdd className={classes.mediumIcon} />
          </IconButton>
        </div>
        <Modal
          aria-labelledby="add-friend-modal"
          aria-describedby="create a new friend by entering their name, email, image address"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={getModalStyle()}
            className={classes.paper}
            id="add_friend_modal"
          >
            <Typography variant="h6" id="modal-title">
              Add a New Friend!
            </Typography>
            {/* TODO - fix padding on input fields */}
            <TextField
              id="outlined-friend-name-input"
              label="Friend's Name"
              required
              fullWidth
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChange("username")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-friend-email-input"
              label="Friend's email"
              className={classes.textField}
              type="email"
              fullWidth
              required
              value={this.state.email}
              onChange={this.handleInputChange("email")}
              autoComplete="current-email"
              margin="normal"
              variant="outlined"
            />
            
            {displayedImage}
            
            
            <div>
              <Button
                id="AddFriendModal_submit_btn"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={this.addNewTarget}
              >
                Add Friend
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AddFriendModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddFriendModal);
