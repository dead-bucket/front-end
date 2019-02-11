import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import BackArrow from "@material-ui/icons/ArrowBack";
import Close from "@material-ui/icons/Close";

// Redux
import { connect } from "react-redux";

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
  backDiv: {
    position: "relative"
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  backButton: {
    position: "absolute",
    left: -30,
    top: -30
  },
  closeButton: {
    position: "absolute",
    right: -30,
    top: -30
  },
  backButton: {
    position: "absolute",
    left: -30,
    top: -30
  },
  mediumIcon: {
    width: 40,
    height: 40
  },
  sendIconStyle: {
    position: "absolute",
    top: "10%",
    right: "10%"
  }
});

// VALIDATE email function
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// TODO: refactor/modularize modal content
class SendEntriesModal extends Component {
  state = {
    open: false,
    modalStage: 0,
    modalMessage: "",
    email: "",
    isUser: false,
    isUser_id: null,
    username: null,
    image: null
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      email: "",
      modalStage: 0,
      modalMessage: ""
    });
  };

  resetModal = () => {
    this.setState({ modalStage: 0 });
  };

  handleInputChange = name => event => {
    const { value } = event.target;
    if (name === "email" && validateEmail(value)) {
      axios
        .get("/api/v1/usersearch/?email=" + value)
        .then(data => {
          console.log("USER SEARCH:", data);

          if (data.status === 200) {
            this.setState({
              username: data.data[0].firstname,
              image: data.data[0].picture,
              isUser: true,
              isUser_id: data.data[0]._id,
              modalStage: 1
            });
          }
        })

        .catch(err =>
          // TODO : if the user can't be found, ask if they want to send an invite to the email address
          this.setState({
            modalStage: 3
          })
        );
    }
    this.setState({
      [name]: event.target.value
    });
  };

  convertTargetToUser = id => {
    console.log(id);
    const { isUser_id } = this.state;
    if (isUser_id) {
      axios
        .put("/api/v1/changetargettouser/?id=" + id, { newUser: isUser_id })
        // TODO - Add a toast of some visual confirmation on success
        .then(data => {
          console.log("friend converted", data);
        })
        .catch(err => console.log(err));
    }
  };

  sendEntriesToUser = id => {
    console.log(id);
    axios
      .put("/api/v1/deliverentries/" + id)
      // TODO - Add a toast of some visual confirmation on success
      .then(data => {
        console.log("Friend Added and Entries sent!", data);
        this.handleClose();
      })
      .catch(err => console.log(err));
  };

  sendInvite = email => {
    axios
      .post("/api/v1/sendinvite/", { email })
      .then(data =>
        this.setState({
          modalMessage: "Invite Sent!",
          modalStage: 4
        })
      )
      .catch(err =>
        this.setState({
          modalMessage: "An error occurred.  Please try again later.",
          modalStage: 4
        })
      );
    console.log(email);
  };

  render() {
    const { username, image, email, modalStage, modalMessage } = this.state;
    const { classes } = this.props;
    const { target } = this.props.profile;
    let modalContent;
    if (target.firstname) {
      modalContent = (
        <div>
          <p>Do you want to send your thoughts to {target.firstname}?</p>
          {/* TODO - change to an X in the corner of the modal */}
          <button onClick={() => this.sendEntriesToUser(target._id)}>
            Yes! Send my thoughts.
          </button>
        </div>
      );
    } else {
      switch (modalStage) {
        // search for a user email
        case 0:
          modalContent = (
            <div>
              <h5>No email associated with this friend.</h5>
              <p>
                In order to send messages to a friend, they also need to be
                Thoughtline users.
              </p>
              <p>
                Search for your friend on Thoughtline by entering their email
                address below:
              </p>
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
            </div>
          );
          break;
        // user email is found.  Confirm user wants to convert target to user
        case 1:
          modalContent = (
            <div>
              <div>
                <p>We found {username}!</p>
                <img src={image} alt="Found friend" />
                <div>
                  <button onClick={() => this.convertTargetToUser(target._id)}>
                    Add {username} as a friend and send your thoughts!
                  </button>
                </div>
              </div>
            </div>
          );
          break;
        case 2:
          modalContent = (
            <div>
              <h1>converted and messages sent</h1>
            </div>
          );
          break;
        case 3:
          modalContent = (
            <div>
              <h5>We couldn't find that email.</h5>
              <p>Would you like to send a Thoughtline invite to this email?</p>
              <p>
                <strong>{email}</strong>
              </p>
              <p>
                You'll receive a notification when they join. Once they've
                joined, you can try sending your thoughts again.
              </p>
              <button onClick={() => this.sendInvite(email)}>
                Send Invite!
              </button>
            </div>
          );
          break;
        case 4:
          modalContent = (
            <div>
              <h2>{modalMessage}</h2>
              <button onClick={this.handleClose}>OK</button>
            </div>
          );
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <div onClick={this.handleOpen} className={classes.sendIconStyle}>
          <IconButton className={classes.medium}>
            <Send className={classes.mediumIcon} />
          </IconButton>
        </div>
        <Modal
          aria-labelledby="send-thoughts-modal"
          aria-describedby="send your thoughts to current friend"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={getModalStyle()}
            className={classes.paper}
            id="send_thoughts_modal"
          >
            <div className={classes.backDiv}>
              {modalStage === 1 || modalStage === 3 ? (
                <IconButton className={classes.backButton}>
                  <BackArrow onClick={this.resetModal} />
                </IconButton>
              ) : null}
              <IconButton className={classes.closeButton}>
                <Close onClick={this.handleClose} />
              </IconButton>
            </div>

            {modalContent}
          </div>
        </Modal>
      </div>
    );
  }
}

SendEntriesModal.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withStyles(styles)(SendEntriesModal));
