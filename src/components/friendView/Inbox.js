import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

const styles = {
  inboxContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll"
  },
  inboxLineMessage: {
    textAlign: "left",
    width: "80%",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    border: "1px solid black"
  }
};

class Inbox extends Component {
  render() {
    const { classes, inboxEntries, name } = this.props;
    let messageContent;
    if (inboxEntries.length === 0) {
      messageContent = (
        <h5>You haven't received a thought from {name} yet...</h5>
      );
    } else {
      messageContent = inboxEntries.map(entry => {
        return (
          <div
            className={classes.inboxLineMessage}
            style={{ backgroundColor: entry.mood }}
            key={entry._id}
          >
            {/* TODO: convert date format */}
            <p style={{ fontSize: 16 }}>
              <Moment format="LLL">{entry.createdAt}</Moment>
            </p>
            <p style={{ fontSize: 20 }}>{entry.description}</p>
          </div>
        );
      });
    }

    return (
      <div className={inboxEntries.length > 0 ? classes.inboxContainer : null}>
        {messageContent}
      </div>
    );
  }
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
  inboxEntries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  inboxEntries: state.entries.inboxEntries
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Inbox));

// export default withStyles(styles)(Inbox);
