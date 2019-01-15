import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

const styles = {
  inboxContainer: {
    height: "90%",
    overflowY: "scroll"
  },
  inboxLineMessage: {
    textAlign: "left",
    borderRadius: 15,
    padding: 20,
    margin: 20
  }
};
const messages = [];
class Inbox extends Component {
  render() {
    const { classes } = this.props;
    let messageContent;
    if (messages.length === 0) {
      messageContent = (
        <h5>You haven't received a thought from this friend yet...</h5>
      );
    } else {
      // messageContent = messages.map(entry => {
      //   return (
      //     <div
      //       className={classes.thoughtLineMessage}
      //       style={{ backgroundColor: entry.mood }}
      //       key={entry._id}
      //     >
      //       {/* TODO: convert date format */}
      //       <p style={{ fontSize: 16 }}>{entry.createdAt}</p>
      //       <p style={{ fontSize: 20 }}>{entry.description}</p>
      //     </div>
      //   );
      // });
    }

    return (
      <div className={messages.length > 0 ? classes.inboxContainer : null}>
        {messageContent}
      </div>
    );
  }
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired
  // userEntries: PropTypes.array.isRequired
};

// const mapStateToProps = state => ({
//   userEntries: state.entries.userEntries
// });

// export default connect(
//   mapStateToProps,
//   {}
// )(withStyles(styles)(Inbox));

export default withStyles(styles)(Inbox);
