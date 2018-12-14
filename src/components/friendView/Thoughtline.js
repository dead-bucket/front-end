import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  timelineContainer: {
    height: "90%",
    overflowY: "scroll"
  }
};
class Thoughtline extends Component {
  render() {
    const { messages, classes } = this.props;
    let messageContent = messages.map(message => {
      if (message.sent) {
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

    return <div className={classes.timelineContainer}>{messageContent}</div>;
  }
}

Thoughtline.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Thoughtline);
