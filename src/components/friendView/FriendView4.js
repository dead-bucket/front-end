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
import Thoughtline from "./Thoughtline";
import Inbox from "./Inbox";
import FriendCard from "./FriendCard";
import Spinner from "../common/Spinner";

const styles = {
  friendContainer: {
    height: 250,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 20
  },
  actionContainer: {
    height: 400,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: 10
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

const messages = [
  {
    id: 1,
    body: "This is my first thought to you.",
    hex: "#0abab5",
    date: "02/08/18",
    sent: true
  },
  {
    id: 5,
    body: "This is my first thought to you.",
    hex: "#ffc0cb",
    date: "02/08/18",
    sent: false
  },
  {
    id: 2,

    body: "I thought of you today and it made me sad.",
    hex: "#98fb98",
    date: "06/20/18",
    sent: true
  },
  {
    id: 3,

    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    hex: "#ff0000",
    date: "08/01/18",
    sent: true
  },
  {
    id: 4,
    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    hex: "#98fb98",
    date: "08/01/18",
    sent: false
  }
];

class FriendView4 extends Component {
  state = {
    friend: [],
    loading: true,
    value: 1
  };

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=1").then(data => {
      console.log(data.data.results);
      this.setState({ friend: data.data.results, loading: false });
    });
  }

  handleBottomChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, friend, loading } = this.state;

    let actionContent;
    switch (value) {
      case 0:
        actionContent = <Thoughtline messages={messages} />;
        break;
      case 1:
        actionContent = <ComposeForm />;
        break;
      case 2:
        actionContent = <Inbox messages={messages} />;
        break;
      default:
        return null;
    }

    let friendViewContent;
    if (loading) {
      friendViewContent = <Spinner />;
    } else {
      console.log("friend done loading", friend);
      friendViewContent = <FriendCard friend={friend} />;
    }

    return (
      <div>
        <div className={classes.friendViewDiv}>
          <div className={classes.friendContainer}>{friendViewContent}</div>
          <div className={classes.actionContainer}>{actionContent}</div>
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleBottomChange}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Thoughtline" icon={<List />} />
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
