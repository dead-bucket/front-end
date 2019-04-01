import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
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
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-around"
  },
  modalHeading: {
    textAlign: "center"
  }
});

class DeleteEntriesModal extends Component {
  state = {};

  render() {
    const { classes, isOpen } = this.props;

    let modalContent;

    modalContent = (
      <div className={classes.container}>
        <h5 className={classes.modalHeading}>
          Are you sure you want to delete this message?
        </h5>
        <br />
        <div className={classes.buttonDiv}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.no()}
          >
            No
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.yes()}
          >
            Yes
          </Button>
        </div>
      </div>
    );

    return (
      <div>
        <Modal
          aria-labelledby="delete-thoughts-modal"
          aria-describedby="delete the message"
          open={isOpen}

          // onClose={this.handleClose}
        >
          <div
            style={getModalStyle()}
            className={classes.paper}
            id="delete_thoughts_modal"
          >
            {modalContent}
          </div>
        </Modal>
      </div>
    );
  }
}

DeleteEntriesModal.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withStyles(styles)(DeleteEntriesModal));
