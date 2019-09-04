import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize ";
import ConfirmIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";

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
    minWidth: 300,
    width: "80%",
    maxWidth: 800,
    backgroundColor: "#87CEFA",
    border: "1px solid black",
    boxShadow: theme.shadows[5],
    borderRadius: 15,
    padding: 15,
    fontSize: ".8rem"
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
    position: "relative",
    display: "flex",
    width: "75%",
    justifyContent: "space-around"
  },
  modalHeading: {
    textAlign: "center",
    fontFamily: "Satisfy, cursive",
    fontSize: "1.5rem",
    color: "#EE5F3F",
    margin: "10px auto"
  },
  textField: {
    margin: "20px auto",
    width: "90%"
  },
  icons: {
    fontSize: "2rem",
    color: "#EE5F3F",
    cursor: "pointer"
  }
});

class EditModal extends Component {
  render() {
    const { classes, isOpen } = this.props;

    const modalStyles = {
      ...getModalStyle(),
      backgroundColor: this.props.editColor
    };

    let modalContent;

    modalContent = (
      <div className={classes.container}>
        <p className={classes.modalHeading}>Edit Your Thought</p>

        <TextField
          id="edit"
          name="editText"
          label="Edit Thought"
          type="text"
          multiline
          rows="4"
          value={this.props.text}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => this.props.handleChange(e)}
        />
        <div className={classes.buttonDiv}>
          <Tooltip title="Cancel Changes" placement="left">
            <CancelIcon
              className={classes.icons}
              onClick={() => this.props.no()}
            />
          </Tooltip>
          {this.props.text.length > 0 ? (
            <Tooltip title="Save Changes" placement="right">
              <ConfirmIcon
                className={classes.icons}
                onClick={() => this.props.yes()}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Enter a thought" placement="right">
              <ConfirmIcon
                className={classes.icons}
                style={{ color: "grey" }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    );

    return (
      <div>
        <Modal
          aria-labelledby="edit-thoughts-modal"
          aria-describedby="edit the message"
          open={isOpen}

          // onClose={this.handleClose}
        >
          <div
            // style={getModalStyle()}
            style={modalStyles}
            className={classes.paper}
            id="edit_thoughts_modal"
          >
            {modalContent}
          </div>
        </Modal>
      </div>
    );
  }
}

EditModal.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withStyles(styles)(EditModal));
