import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

// Custom Components
import AddButton from "../common/AddButton";

// CSS
import "./AddFriendModal.css";

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
  }
});

class AddFriendModal extends React.Component {
  state = {
    open: false,
    addFriendName: "",
    addFriendEmail: "",
    addFriendImageUrl: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      addFriendName: "",
      addFriendEmail: "",
      addFriendImageUrl: ""
    });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addNewFriend = () => {
    // TODO - validate inputs
    const newFriend = {
      addFriendName: this.state.addFriendName,
      addFriendEmail: this.state.addFriendEmail,
      addFriendImageUrl: this.state.addFriendImageUrl
    };
    console.log(newFriend);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div onClick={this.handleOpen} className="add_button z-depth-5">
          <p className="add_button_icon">+</p>
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
            <TextField
              id="outlined-friend-name-input"
              label="Friend's Name"
              required
              fullWidth
              className={classes.textField}
              value={this.state.addFriendName}
              onChange={this.handleInputChange("addFriendName")}
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
              value={this.state.addFriendEmail}
              onChange={this.handleInputChange("addFriendEmail")}
              autoComplete="current-email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-friend-email-input"
              label="Friend's image address"
              className={classes.textField}
              fullWidth
              required
              value={this.state.addFriendImageUrl}
              onChange={this.handleInputChange("addFriendImageUrl")}
              autoComplete="current-image"
              margin="normal"
              variant="outlined"
            />
            <div>
              <Button
                id="AddFriendModal_submit_btn"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={this.addNewFriend}
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
