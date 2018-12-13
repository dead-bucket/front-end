import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import List from "@material-ui/icons/List";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import MoveToInbox from "@material-ui/icons/MoveToInbox";

// Custom Components
import ComposeForm from "./ComposeForm";
const styles = {
  friendViewDiv: {
    border: "1px solid black"
  },
  friendContainer: {
    height: 200
  },
  actionContainer: {
    height: 450,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0
  },
  root: {
    width: "100%"
  }
};

class FriendView4 extends Component {
  state = {
    friend: [],
    loading: true,
    value: 1
  };

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=1").then(data => {
      console.log(data.data.results);
      this.setState({ friends: data.data.results, loading: false });
    });
  }

  handleBottomChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let actionConent;
    switch (value) {
      case 0:
        actionConent = <h2>This is Thoughtline</h2>;
        break;
      case 1:
        actionConent = <ComposeForm />;
        break;
      case 2:
        actionConent = <h2>This is Inbox</h2>;
        break;
      default:
        return null;
    }
    return (
      <div>
        <div className={classes.friendViewDiv}>
          <div className={classes.friendContainer}>
            This is the friend container
          </div>
          <div className={classes.actionContainer}>{actionConent}</div>
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleBottomChange}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Thoughts" icon={<List />} />
          <BottomNavigationAction label="Compose" icon={<AddCircleOutline />} />
          <BottomNavigationAction label="Inbox" icon={<MoveToInbox />} />
        </BottomNavigation>
      </div>
    );
  }
}

FriendView4.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FriendView4);
