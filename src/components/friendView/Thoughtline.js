import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Moment from "react-moment";
import SendEntriesModal from "./SendEntriesModal";

const styles = {
  timelineContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll"
  },
  // TODO - Center Messages
  thoughtLineMessage: {
    textAlign: "left",
    width: "80%",
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
            <p style={{ fontSize: 16 }}>
              <Moment format="LLL">{entry.createdAt}</Moment>
            </p>
            <p style={{ fontSize: 20 }}>{entry.description}</p>
          </div>
        );
      });
    }

    return (
      <div className={classes.timelineContainer}>
        {userEntries.length > 0 ? <SendEntriesModal /> : null}
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
