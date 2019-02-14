import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import BackArrow from "@material-ui/icons/ArrowBack";
import Close from "@material-ui/icons/Close";
import ArrowRight from "@material-ui/icons/ArrowRightAlt";
import CheckCircle from "@material-ui/icons/CheckCircleOutlined";

// Redux
import { connect } from "react-redux";
import { setCurrentTarget } from "../../_actions/profileActions";

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
  buttonDiv: {
    position: "relative"
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
  mediumIcon: {
    width: 40,
    height: 40
  },
  sendIconStyle: {
    position: "absolute",
    top: "10%",
    right: "10%"
  },
  compareFound: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  compareDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  compareName: {
    marginTop: 0,
    fontWeight: "bold"
  },
  checkCircle: {
    color: "green"
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
    foundFirstname: null,
    foundLastname: null,
    image: null,
    convertedUser: false,
    hasFriendConverted: false,
    haveEntriesSent: false,
    haveInvitesSent: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      email: "",
      modalStage: 0,
      modalMessage: "",
      convertedUser: false,
      hasFriendConverted: false,
      haveEntriesSent: false,
      haveInvitesSent: false
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
              foundFirstname: data.data[0].firstname,
              foundLastname: data.data[0].lastname,
              image: data.data[0].picture,
              isUser_id: data.data[0]._id,
              modalStage: 1
            });
          }
        })

        .catch(err =>
          // TODO : if the user can't be found, ask if they want to send an invite to the email address
          this.setState({
            modalStage: 2
          })
        );
    }
    this.setState({
      [name]: event.target.value
    });
  };
  addFriendToUser = id => {
    console.log("in add friend to user fn on modal", id);
    const { isUser_id } = this.state;
    if (isUser_id) {
      axios
        .put("/api/v1/addfriend/", { friend: isUser_id })
        // TODO - Add a toast of some visual confirmation on success
        .then(data => {
          console.log("friend added", data);
        })
        .catch(err => console.log(err));
    }
  };

  convertTargetToUser = id => {
    const { isUser_id } = this.state;
    if (isUser_id) {
      axios
        .put("/api/v1/changetargettouser/?id=" + id, { newUser: isUser_id })
        // TODO - Add a toast of some visual confirmation on success
        .then(data => {
          this.setState({ convertedUser: true });
          this.props.setCurrentTarget(data.data);
        })
        .then(() => this.addFriendToUser(isUser_id))
        .then(() => this.sendEntriesToUser(isUser_id))
        .catch(err => console.log(err));
    }
  };

  sendEntriesToUser = id => {
    console.log(id);
    axios
      .put("/api/v1/deliverentries/", { recipient: id })

      .then(data => {
        console.log("Friend Added and Entries sent!", data);
        this.setState({
          modalMessage: "Friend added & thoughts sent!",
          modalStage: 3
        });
      })
      .catch(err => console.log(err));
  };

  sendInvite = email => {
    axios
      .post("/api/v1/sendinvite/", { email })
      .then(data =>
        this.setState({
          modalMessage: "Invite Sent!",
          modalStage: 3
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const {
      foundFirstname,
      foundLastname,
      image,
      email,
      modalStage,
      modalMessage,
      convertedUser,
      hasFriendConverted,
      haveEntriesSent,
      haveInvitesSent
    } = this.state;
    const { classes } = this.props;
    const { target } = this.props.profile;
    let modalContent;
    if (target.firstname && !convertedUser) {
      modalContent = (
        <div>
          <p>Do you want to send your thoughts to {target.firstname}?</p>

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
              <h5>We found {foundFirstname}!</h5>

              <div className={classes.compareFound}>
                <div className={classes.compareDiv}>
                  <img src={target.picture} alt="Current friend" />
                  <p className={classes.compareName}>{target.username}</p>
                </div>
                <ArrowRight style={{ fontSize: 60 }} />
                <div className={classes.compareDiv}>
                  <img src={image} alt="Found friend" />
                  <p className={classes.compareName}>
                    {foundFirstname} {foundLastname}
                  </p>
                </div>
              </div>
              <p>Is this the friend you're looking for?</p>
              <p>
                By clicking below <strong>{target.username}</strong>'s details
                will be replaced with <strong>{foundFirstname}</strong>
                's and your thoughts will be sent to them.
              </p>
              <div>
                <button onClick={() => this.convertTargetToUser(target._id)}>
                  Add {foundFirstname} as a friend and send your thoughts!
                </button>
              </div>
            </div>
          );
          break;

        case 2:
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
        case 3:
          // hasFriendConverted: false,
          // haveEntriesSent: false,
          // haveInvitesSent: false
          modalContent = (
            <div>
              <h2>Status:</h2>
              {haveEntriesSent ? (
                <p>
                  <CheckCircle className={classes.CheckCircle} /> Thoughts sent!
                </p>
              ) : null}
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
            <div className={classes.buttonDiv}>
              {modalStage === 1 || modalStage === 2 ? (
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
  profile: PropTypes.object.isRequired,
  setCurrentTarget: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { setCurrentTarget }
)(withStyles(styles)(SendEntriesModal));
