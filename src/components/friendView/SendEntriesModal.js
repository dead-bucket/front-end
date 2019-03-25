import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { isEmail } from "../../utils/validation";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import BackArrow from "@material-ui/icons/ArrowBack";
import Close from "@material-ui/icons/Close";
import ArrowRight from "@material-ui/icons/ArrowRightAlt";
import CheckCircle from "@material-ui/icons/CheckCircleOutlined";
import Search from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";

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
    width: theme.spacing.unit * 35,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  },
  statusMessage: {
    display: "flex",
    alignItems: "center"
  },
  searchButton: {
    marginLeft: 10,
    width: 55
  },
  modalHeading: {
    textAlign: "center"
  }
});

// TODO: refactor/modularize modal content
class SendEntriesModal extends Component {
  state = {
    open: false,
    modalStage: 0,
    email: "",
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
    this.setState({
      [name]: value
    });
  };

  searchEmail = email => {
    axios
      .get("/api/v1/usersearch/?email=" + email)
      .then(data => {
        console.log("USER SEARCH:", data);

        if (data.status === 200) {
          this.setState({
            modalStage: 1,
            foundFirstname: data.data[0].firstname,
            foundLastname: data.data[0].lastname,
            image: data.data[0].picture,
            isUser_id: data.data[0]._id
          });
        }
      })

      .catch(err =>
        // TODO : if the user can't be found, ask if they want to send an invite to the email address
        this.setState({
          modalStage: 2
        })
      );
  };

  convertTargetToUser = id => {
    const { isUser_id } = this.state;
    if (isUser_id) {
      axios
        .put("/api/v1/changetargettouser/?id=" + id, { newUser: isUser_id })
        // TODO - Add a toast of some visual confirmation on success
        .then(data => {
          this.setState({ convertedUser: true, modalStage: 3 });
          this.props.setCurrentTarget(data.data);
        })
        .then(() => this.addFriendToUser(isUser_id))
        .then(() => this.sendEntriesToUser(isUser_id))
        .catch(err => console.log(err));
    }
  };

  addFriendToUser = id => {
    console.log("in add friend to user fn on modal", id);
    const { isUser_id } = this.state;
    if (isUser_id) {
      axios
        .put("/api/v1/addfriend/", { friend: isUser_id })
        // TODO - Add a toast of some visual confirmation on success
        .then(data => {
          this.setState({ hasFriendConverted: true });
        })
        .catch(err => console.log(err));
    }
  };

  sendEntriesToUser = id => {
    axios
      .put("/api/v1/deliverentries/", { recipient: id })

      .then(data => {
        console.log("Friend Added and Entries sent!", data);
        this.setState({
          convertedUser: true,
          modalStage: 3,
          haveEntriesSent: true
        });
      })
      .catch(err => console.log(err));
  };

  sendInvite = email => {
    axios
      .post("/api/v1/sendinvite/", { email })
      .then(data =>
        this.setState({
          modalStage: 3,
          haveInvitesSent: true
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
        <div className={classes.container}>
          <h5 className={classes.modalHeading}>
            Do you want to send your thoughts to {target.firstname}?
          </h5>
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.sendEntriesToUser(target._id)}
          >
            Yes! Send my thoughts.
          </Button>
        </div>
      );
    } else {
      switch (modalStage) {
        // search for a user email
        case 0:
          modalContent = (
            <div>
              <h5 className={classes.modalHeading}>
                No email associated with this friend.
              </h5>
              <p>
                In order to send messages to a friend, they also need to be
                Thoughtline users.
              </p>
              <p>
                Search for your friend on Thoughtline by entering their email
                address below:
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
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

                <Fab
                  size="medium"
                  color="primary"
                  aria-label="Search"
                  disabled={!isEmail(email)}
                  onClick={() => this.searchEmail(email)}
                  className={classes.searchButton}
                >
                  <Search />
                </Fab>
              </div>
            </div>
          );
          break;
        // user email is found.  Confirm user wants to convert target to user
        case 1:
          modalContent = (
            <div>
              <h5 className={classes.modalHeading}>
                We found {foundFirstname}!
              </h5>

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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.convertTargetToUser(target._id)}
                >
                  Add {foundFirstname} as a friend and send your thoughts!
                </Button>
              </div>
            </div>
          );
          break;

        case 2:
          modalContent = (
            <div>
              <h5 className={classes.modalHeading}>
                We couldn't find that email.
              </h5>
              <p>Would you like to send a Thoughtline invite to this email?</p>
              <h5 className={classes.modalHeading}>
                <strong>{email}</strong>
              </h5>
              <p>
                You'll receive a notification when they join. Once they've
                joined, you can try sending your thoughts again.
              </p>
              <div className={classes.container}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.sendInvite(email)}
                >
                  Send Invite!
                </Button>
              </div>
            </div>
          );
          break;
        case 3:
          modalContent = (
            <div className={classes.container}>
              <h5>Status:</h5>
              <div>
                {hasFriendConverted ? (
                  <div className={classes.statusMessage}>
                    <CheckCircle className={classes.checkCircle} />{" "}
                    <p style={{ marginLeft: 10 }}>Friend Added!</p>
                  </div>
                ) : null}
                {haveEntriesSent ? (
                  <div className={classes.statusMessage}>
                    <CheckCircle className={classes.checkCircle} />{" "}
                    <p style={{ marginLeft: 10 }}>Thoughts Sent!</p>
                  </div>
                ) : null}
                {haveInvitesSent ? (
                  <div className={classes.statusMessage}>
                    <CheckCircle className={classes.checkCircle} />{" "}
                    <p style={{ marginLeft: 10 }}>Invite Sent!</p>
                  </div>
                ) : null}
              </div>
              <br />
              {haveInvitesSent || haveEntriesSent ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleClose}
                >
                  OK
                </Button>
              ) : null}
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
