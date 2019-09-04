import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
// import TextField from "@material-ui/core/TextField";

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
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonDiv: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-around"
  },
  modalHeading: {
    textAlign: "center"
  },
  textField: {
    margin: "20px auto",
    width: 300
  }
});

class EditModal extends Component {
  render() {
    const { classes, isOpen } = this.props;

    let modalContent;

    modalContent = (
      <div className={classes.container}>
        {/* <p className={classes.modalHeading}>
          Edit the Message
        </p> */}

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
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.no()}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.yes()}
          >
            Save
          </Button>
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
            style={getModalStyle()}
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
