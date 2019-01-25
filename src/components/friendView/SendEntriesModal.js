import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

// CSS
// import "./SendEntriesModal.css";

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

class SendEntriesModal extends Component {
  state = {
    open: false,
    name: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
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
            <Typography variant="h6" id="modal-title">
              Send your thoughts to [friendName]
            </Typography>
            {/* TODO - fix padding on input fields */}
            <TextField
              id="outlined-friend-name-input"
              label="Friend's Name"
              required
              fullWidth
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleInputChange("name")}
              margin="normal"
              variant="outlined"
            />

            <div>
              <Button fullWidth variant="contained" className={classes.button}>
                Send Thoughts
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SendEntriesModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SendEntriesModal);
