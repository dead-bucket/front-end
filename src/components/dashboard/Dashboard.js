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
import {
  setCurrentTarget,
  getNotifications
} from "../../_actions/profileActions";
import { loadUser } from "../../_actions/authActions";

const styles = {
  mainTitle: {
    textAlign: "center",
    fontFamily: "Satisfy, cursive",
    marginBottom: 0,
    fontSize: "1.75rem"
  },
  intro: {
    width: "90%",
    textAlign: "center",
    fontSize: 18
  },
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
      .get("/api/v1/dashboard/")
      .then(data => {
        this.setState({ friends: data.data, loading: false });
      })
      .catch(err => console.log(err));
  };

  togglePriority = friend => {
    console.log("in toggle priority fn", friend);
    axios
      .put("/api/v1/togglepriority/", {
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
    this.props.getNotifications();
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
          <div className={classes.intro}>
            <h4>
              ...adding a friend with add button below.{" "}
              <span role="img" aria-label="heart-eyes-emoji">
                😍
              </span>
            </h4>

            <p>But first, a quick introduction...</p>

            <p> Thank you for checking out the Thoughtline beta! </p>
            <p>
              We have poured our heart and soul into Thoughtline, and look
              forward to continually improving it with your support and
              feedback!
            </p>

            <p>
              If you have suggestions, feedback or run into a technical issues,
              please let us know by using the "Give Us Feedback" link found in
              the Navbar menu.
            </p>
            <p>
              Thoughtline is all about having a safe place to express yourself
              and keep track of life's special moments.
            </p>
            <p>
              Add a friend (either privately or by connecting with other
              Thoughtline users) and start adding thoughts to your Thoughtline!
            </p>
          </div>
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
          <p className={classes.mainTitle}>Thinking about...</p>
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
  { setCurrentTarget, loadUser, getNotifications }
)(withStyles(styles)(Dashboard));
