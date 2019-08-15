import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { isEmail } from "../../utils/validation";
import ImgUpload from "../common/ImgUpload";
import API from "../../utils/API";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";
import Button from "../common/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import Close from "@material-ui/icons/Close";
import BackArrow from "@material-ui/icons/ArrowBack";
import CheckCircle from "@material-ui/icons/CheckCircleOutlined";
import Search from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
// import textFieldStyles from "../common/styles/TextField_styles";

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
    minWidth: 300,
    maxWidth: 500,
    backgroundColor: "#87CEFA",
    border: "1px solid #EE5F3F",
    boxShadow: theme.shadows[5],
    padding: 30,
    fontSize: ".8rem"
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  mediumIcon: {
    width: 40,
    height: 40,
    color: "#87CEFA"
  },
  buttonDiv: {
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    right: -20,
    top: -30
  },
  backButton: {
    position: "absolute",
    left: -30,
    top: -30
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  profileText: {
    margin: 0
  },
  searchButton: {
    marginLeft: 10,
    width: 55
  },
  modalHeading: {
    fontFamily: "Satisfy, cursive",
    textAlign: "center",
    color: "#EE5F3F",
    fontSize: 40,
    margin: 0
  },
  error: {
    color: "white",
    fontSize: 14,
    margin: 0
  }
});

// TODO - modularize modal content to reduce length of component

class AddFriendModal extends Component {
  state = {
    open: false,
    username: "",
    email: "",
    image: "",
    modalStage: 0,
    isUser_id: null,
    errorMessage: null,
    
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  

  handleClose = () => {
    this.setState({
      open: false,
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      image: "",
      name: "",
      isUser_id: "",
      errorMessage: null,
      modalStage: 0,
      
    });
  };

  handleInputChange = name => event => {
    const { value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleProfileImg = image => {
    this.setState({ image });
  };

  resetModal = () => {
    this.setState({ modalStage: 0 });
  };

  searchEmail = email => {
    axios
      .get(API + "/api/v1/usersearch/?email=" + email)
      .then(data => {
        console.log("USER SEARCH:", data);

        if (data.status === 200) {
          this.setState({
            username: data.data[0].username,
            firstname: data.data[0].firstname,
            lastname: data.data[0].lastname,
            image: data.data[0].picture,
            isUser_id: data.data[0]._id,
            modalStage: 1
          });
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: `No users associated with ${email}. Please create a Private Friend.`,
          modalStage: 2
        });
      });
  };

  addNewTarget = () => {
    // TODO - validate inputs
    const { username, image } = this.state;
    let newTarget;
    if (!image) {
      newTarget = {
        username
      };
    } else {
      newTarget = {
        username,
        image
      };
    }

    // TODO - move to actions
    axios
      .post(API + "/api/v1/target/", newTarget)
      .then(data => {
        this.props.refreshTargets();
        this.setState({ modalStage: 3 });
      })
      .catch(err => console.log(err));
  };

  addNewUser = () => {
    let friend = { friend: this.state.isUser_id };
    axios
      .put(API + "/api/v1/addfriend", friend)
      .then(data => {
        console.log(data);
        this.props.refreshTargets();
        this.setState({ modalStage: 3 });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const {
      modalStage,
      errorMessage,
      image,
      username,
      email,
      firstname,
      lastname
    } = this.state;

    let modalContent;
    switch (modalStage) {
      case 0:
        // Search for a new Friend
        modalContent = (
          <div>
            <h4 className={classes.modalHeading}>Add a New Friend</h4>
            <p>
              If you want the ability to send thoughts to a friend, enter their
              email address in the field below.
            </p>
            <p>
              If they are an existing user, you can choose to add them using
              their existing profile info.
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
            <hr />
            <div>
              <div className={classes.container}>
                <p>
                  Alternatively, you can click <b>Create Private Friend</b>.
                </p>
                <Button
                  primary
                  handleClick={() => this.setState({ modalStage: 2 })}
                >
                  Create Private Friend
                </Button>
              </div>
            </div>
          </div>
        );
        break;
      case 1:
        // If an associated email is found, display that user's info and prompt to add as a friend
        modalContent = (
          <div>
            <div className={classes.container}>
              <h4 className={classes.modalHeading}>User Found!</h4>
              <img src={image} style={{ width: 90 }} alt="Found User" />
              <strong>
                <p className={classes.profileText}>
                  {firstname} {lastname}
                </p>
              </strong>
              <p className={classes.profileText}>{username}</p>
              <p>Do you want to add this user as a friend?</p>
              <Button secondary handleClick={this.addNewUser}>
                Add This Friend
              </Button>
            </div>
            <br />
            <hr />
            <div className={classes.container}>
              <p>
                Alternatively, you can <b>Create a Private Friend</b>:
              </p>
              <Button
                primary
                handleClick={() => this.setState({ modalStage: 2 })}
              >
                Create Private Friend
              </Button>
            </div>
          </div>
        );
        break;
      case 2:
        // If NO associated email is found, prompt to make a new Private Friend
        modalContent = (
          <div>
            <h4 className={classes.modalHeading}>Create a Private Friend</h4>
            {errorMessage ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}
            <p>
              Give your friend a <strong>name</strong> (required) and a{" "}
              <strong>profile picture</strong>
              (optional):
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
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

              <ImgUpload updateImg={this.handleProfileImg} />
              <br />
              <div className={classes.container}>
                <Button
                  primary
                  handleClick={this.addNewTarget}
                  disabled={!username}
                >
                  Create Private Friend
                </Button>
              </div>
            </div>
          </div>
        );
        break;
      case 3:
        // Friend Added Confirmation
        modalContent = (
          <div className={classes.container}>
            <h4>Friend Added!</h4>
            <CheckCircle style={{ color: "green", fontSize: 80 }} />
          </div>
        );
        break;
      default:
        break;
    }

    return (
      <div className={classes.addFriendModal}>
        <div >
          <Tooltip title="Add Friend">
            <IconButton onClick={this.handleOpen} className={classes.medium}>
              <PersonAdd className={classes.mediumIcon} />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Delete Friend" >
              <IconButton className={classes.medium} onClick={() => this.props.toggleDelete()}>
                <RemoveCircleOutline className={classes.mediumIcon} />
              </IconButton>
          </Tooltip> */}
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
            <div className={classes.buttonDiv}>
              {modalStage === 1 || modalStage === 2 ? (
                <IconButton
                  className={classes.backButton}
                  onClick={this.resetModal}
                >
                  <BackArrow />
                </IconButton>
              ) : null}
              <IconButton
                className={classes.closeButton}
                onClick={this.handleClose}
              >
                <Close />
              </IconButton>

              {modalContent}
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
