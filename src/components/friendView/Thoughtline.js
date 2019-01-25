import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import SendEntriesModal from "./SendEntriesModal";
const styles = {
  timelineContainer: {
    overflowY: "scroll"
  },
  thoughtLineMessage: {
    textAlign: "left",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    border: "1px solid black"
  }
};
class Thoughtline extends Component {
  render() {
    const { classes, userEntries } = this.props;

    let messageContent;
    if (userEntries.length === 0) {
      messageContent = (
        <h5>You haven't entered a thought for this friend yet...</h5>
      );
    } else {
      messageContent = userEntries.map(entry => {
        return (
          <div
            className={classes.thoughtLineMessage}
            style={{ backgroundColor: entry.mood }}
            key={entry._id}
          >
            {/* TODO: convert date format */}
            <p style={{ fontSize: 16 }}>{entry.createdAt}</p>
            <p style={{ fontSize: 20 }}>{entry.description}</p>
          </div>
        );
      });
    }

    return (
      <div className={classes.timelineContainer}>
        <SendEntriesModal />
        {messageContent}
      </div>
    );
  }
}

Thoughtline.propTypes = {
  classes: PropTypes.object.isRequired,
  userEntries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userEntries: state.entries.userEntries
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Thoughtline));
