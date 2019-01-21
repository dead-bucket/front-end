import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

const styles = {
  timelineContainer: {
    overflowY: "scroll"
  },
  thoughtLineMessage: {
    textAlign: "left",
    borderRadius: 15,
    padding: 20,
    margin: 20
  }
};
class Thoughtline extends Component {
  render() {
    const { classes, userEntries } = this.props;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: '12h' };

    let messageContent;
    if (userEntries.length === 0) {
      messageContent = (
        <h5>You haven't entered a thought for this friend yet...</h5>
      );
    } else {
      messageContent = userEntries.map(entry => {
        let d = new Date(entry.createdAt);

        return (
          <div
          className={classes.thoughtLineMessage}
          style={{ backgroundColor: entry.mood }}
          key={entry._id}
          >
            {/* TODO: convert date format converted to readable time - roger */}
            <p style={{ fontSize: 12 }}>{d.toLocaleDateString('en-US', options)}{'  '}{d.toLocaleTimeString()}</p>
            <p style={{ fontSize: 20 }}>{entry.description}</p>
          </div>
        );
      });
    }

    return <div className={classes.timelineContainer}>{messageContent}</div>;
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
