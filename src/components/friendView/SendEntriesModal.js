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
  medium: {
    width: 60,
    height: 60,
    padding: 12
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
      email: null,
      errorMessage: null
    });
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
              errorMessage: null
            });
          }
        })

        .catch(err =>
          this.setState({
            errorMessage:
              "Unfortunately, that email isn't associated with a thoughline account"
          })
        );
    }
    this.setState({
      [name]: event.target.value
    });
  };

  sendEntriesToUser = id => {
    console.log(id);
    axios
      .put("/api/v1/deliverentries/", { recipient: id })
      // TODO - Add a toast of some visual confirmation on success
      .then(data => {
        console.log("Friend Added and Entries sent!", data);
        this.handleClose();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { errorMessage, username, isUser, isUser_id, image } = this.state;
    const { classes } = this.props;
    const { target } = this.props.profile;
    let modalContent;
    if (target.firstname) {
      modalContent = (
        <div>
          <p>Do you want to send your thoughts to {target.firstname}?</p>
          {/* TODO - change to an X in the corner of the modal */}
          <button onClick={this.handleClose}>Close</button>
          <button onClick={() => this.sendEntriesToUser(target._id)}>
            Yes! Send my thoughts.
          </button>
        </div>
      );
    } else {
      modalContent = (
        <div>
          <h5>No email associate with this friend.</h5>
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
          {errorMessage ? <p>{errorMessage}</p> : null}
          {isUser ? (
            <div>
              <p>We found {username}!</p>
              <img src={image} alt="Found friend" />
            </div>
          ) : null}
          {isUser ? (
            <div>
              <button onClick={() => this.sendEntriesToUser(isUser_id)}>
                Add {username} as a friend and send your thoughts!
              </button>
            </div>
          ) : null}
          <button onClick={this.handleClose}>Back</button>
        </div>
      );
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
