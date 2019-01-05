import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

// Custom Components
import Spinner from "../common/Spinner";
import FriendCard from "../common/FriendCard";
import AddFriendModal from "./AddFriendModal";

// TODO
//  -Adding a new user: when they click the icon and create a friend, display the friend created in the modal?  If the user exists, show them the badge friend item based on the DB info and let them know the user exists.

const styles = {
  friendContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflowY: "scroll",
    height: 550
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true
    };
  }
  getTargets = () => {
    axios
      .get("http://localhost:3000/api/v1/target/")
      .then(data => {
        this.setState({ friends: data.data, loading: false });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getTargets();
  }

  render() {
    const { loading, friends } = this.state;
    const { classes } = this.props;
    let dashboardContent;
    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = friends.map(friend => (
        <FriendCard key={friend._id} friend={friend} view="dashboard" />
      ));
    }
    return (
      <div>
        <div>
          <h4 style={{ textAlign: "center" }}>Thinking about...</h4>
          <Link to="/friendview">
            <div className={classes.friendContainer}>{dashboardContent}</div>
          </Link>
        </div>
        {/* TODO get tooltip to work */}
        {/* <Tooltip title="Add a new friend" placement="top">
          <AddButton />
        </Tooltip> */}
        <AddFriendModal refreshTargets={this.getTargets} />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
