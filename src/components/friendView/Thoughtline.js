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
    const { classes } = this.props;
    let messageContent = this.props.userEntries.map(entry => {
      return (
        <div
          className={classes.thoughtLineMessage}
          style={{ backgroundColor: entry.mood }}
          key={entry.id}
        >
          {/* TODO: convert date format */}
          <p style={{ fontSize: 16 }}>{entry.createdAt}</p>
          <p style={{ fontSize: 20 }}>{entry.description}</p>
        </div>
      );
    });

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
