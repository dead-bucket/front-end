import React, { Component } from "react";
import PropTypes from "prop-types";
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
class Inbox extends Component {
  render() {
    const { messages, classes } = this.props;
    let messageContent = messages.map(message => {
      if (!message.sent) {
        return (
          <div
            className={classes.inboxLineMessage}
            style={{ backgroundColor: message.hex }}
            key={message.id}
          >
            <p style={{ fontSize: 16 }}>{message.date}</p>
            <p style={{ fontSize: 20 }}>{message.body}</p>
          </div>
        );
      }
    });

    return <div className={classes.inboxContainer}>{messageContent}</div>;
  }
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Inbox);
