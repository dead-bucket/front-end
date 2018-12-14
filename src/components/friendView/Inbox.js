import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  inboxContainer: {
    height: "90%",
    overflowY: "scroll"
  }
};
class Inbox extends Component {
  render() {
    const { messages, classes } = this.props;
    let messageContent = messages.map(message => {
      if (!message.sent) {
        return (
          <div
            className="timeline_message_sent z-depth-3"
            style={{ backgroundColor: message.hex }}
            key={message.id}
          >
            <p className="timeline_message_text">
              <span>{message.date}</span>
            </p>
            <p className="timeline_message_body">{message.body}</p>
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
