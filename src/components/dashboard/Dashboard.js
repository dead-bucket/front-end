import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core";

// Custom Components
import Spinner from "../common/Spinner";
import FriendCard from "../common/FriendCard";
import AddFriendModal from "./AddFriendModal";

//Redux
import { connect } from "react-redux";
import { setCurrentTarget } from "../../_actions/profileActions";
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
    // TODO : move to profile actions
    axios
      .get("http://localhost:3000/api/v1/target/")
      .then(data => {
        this.setState({ friends: data.data, loading: false });
      })
      .catch(err => console.log(err));
  };

  setTarget = friend => {
    this.props.setCurrentTarget(friend);
    this.props.history.push("/friendview");
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
      if (friends.length === 0) {
        dashboardContent = (
          <h5>...adding a friend by clicking the green add button. :)</h5>
        );
      } else {
        dashboardContent = friends.map(friend => (
          <FriendCard
            key={friend._id}
            friend={friend}
            handleSetTarget={this.setTarget}
            view="dashboard"
          />
        ));
      }
    }
    return (
      <div>
        <div>
          <h4 style={{ textAlign: "center" }}>Thinking about...</h4>
          <div className={classes.friendContainer}>{dashboardContent}</div>
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

export default connect(
  null,
  { setCurrentTarget }
)(withStyles(styles)(Dashboard));
