import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";

// Custom Components
import Spinner from "../common/Spinner";
import FriendCard from "../common/FriendCard";
import AddFriendModal from "./AddFriendModal";

//Redux
import { connect } from "react-redux";
import { setCurrentTarget } from "../../_actions/profileActions";
import { loadUser } from "../../_actions/authActions";

const API = process.env.REACT_APP_API;
const styles = {
  friendContainer: {
    background: "inherit",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowY: "scroll",
    height: "77vh"
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
};

class Dashboard extends Component {
  state = {
    friends: [],
    loading: true
  };

  getTargets = () => {
    // TODO : move to profile actions - bring in friends through state, do a check in componentDidMount to see if this.props.friends exists, otherwise make the request
    axios
      .get(`${API}/api/v1/dashboard/`)
      .then(data => {
        this.setState({ friends: data.data, loading: false });
      })
      .catch(err => console.log(err));
  };

  togglePriority = friend => {
    console.log("in toggle priority fn", friend);
    axios
      .put(`${API}/api/v1/togglepriority/`, {
        priority: friend._id
      })
      .then(data => {
        console.log(data);
        this.getTargets();
      })
      .catch(err => console.log(err));
  };

  setTarget = friend => {
    this.props.setCurrentTarget(friend);
    this.props.history.push("/friendview");
  };

  componentDidMount() {
    this.props.loadUser(this.props.history);
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
          <h5>...adding a friend with add button below. :)</h5>
        );
      } else {
        dashboardContent = friends.map(friend => (
          <FriendCard
            key={friend._id}
            friend={friend}
            handleSetTarget={this.setTarget}
            handleToggle={this.togglePriority}
            view="dashboard"
            loggedInUser={this.props.currentUser}
          />
        ));
      }
    }
    return (
      <div>
        <div>
          <h4 style={{ textAlign: "center", fontFamily: "Satisfy, cursive" }}>
            Thinking about...
          </h4>
          <div className={classes.friendContainer}>{dashboardContent}</div>
        </div>

        <BottomNavigation className={classes.stickToBottom}>
          <AddFriendModal refreshTargets={this.getTargets} />
        </BottomNavigation>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { setCurrentTarget, loadUser }
)(withStyles(styles)(Dashboard));
