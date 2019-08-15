import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import API from "../../utils/API";
// Custom Components
import NavBar from "../common/NavBar";
import Spinner from "../common/Spinner";
import FriendCard from "../common/FriendCard";
import AddFriendModal from "./AddFriendModal";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//Redux
import { connect } from "react-redux";
import {
  getFriends,
  setCurrentTarget,
  getNotifications
} from "../../_actions/profileActions";
import { loadUser } from "../../_actions/authActions";
// TODO: checkout touch-action for sliding on mobile: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action

const styles = {
  dashboardWrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#87CEFA"
  },

  mainTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Satisfy, cursive",
    marginBottom: 0,
    fontSize: "1.5rem",
    flexGrow: 1,
    color: "#EE5F3F"
  },
  friendContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "scroll",
    height: "100%",
    flexGrow: 2
  },
  intro: {
    width: "100%",
    maxWidth: 500,
    textAlign: "center",
    padding: 15,
    fontSize: 16
  },
  bottomNavigation: {
    alignItems: "center",
    height: 60,
    backgroundColor: "#EE5F3F"
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  mediumIcon: {
    width: 40,
    height: 40,
    color: "#87CEFA"
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteLayer: false,
    }
    this.toggleDeleteLayer = this.toggleDeleteLayer.bind(this);
  }
  
  componentDidMount() {
    this.props.loadUser(this.props.history);
    if (!this.props.friends) {
      this.props.getFriends();
    }
    this.props.getNotifications();
  }
  toggleDeleteLayer = () => {
    // alert('toggle delete layer fired');
    this.setState({
      deleteLayer: !this.state.deleteLayer,
    })
  }
  togglePriority = friend => {
    // console.log("in toggle priority fn", friend);
    axios
      .put(API + "/api/v1/togglepriority/", {
        priority: friend._id
      })
      .then(data => {
        this.props.getFriends();
      })
      .catch(err => console.log(err));
  };

  setTarget = friend => {
    this.props.setCurrentTarget(friend);
    this.props.history.push("/friendview");
  };

  render() {
    const { classes, friends } = this.props;
    let loading = !friends ? true : false;

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
              by keep track of life's special moments and (if you want to) share
              them with friends!
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
            deleteLayer={this.state.deleteLayer}
          />
        ));
      }
    }
    return (
      <div className={classes.dashboardWrapper}>
        <NavBar />
        <div className={classes.mainTitle}>
          <p style={{ margin: "0 auto" }}>Thinking about...</p>
        </div>
        <div className={classes.friendContainer}>{dashboardContent}</div>

        <BottomNavigation className={classes.bottomNavigation}>
          
          <AddFriendModal refreshTargets={this.props.getFriends}
                          toggleDelete={this.toggleDeleteLayer} />
          <div className={classes.medium}>
          <Tooltip title="Remove Friend">
            <IconButton className={classes.medium}
              onClick={() => this.toggleDeleteLayer()}>
              <RemoveCircleOutline 
                className={classes.mediumIcon} 
                />
            </IconButton>

          </Tooltip>

          </div>

          
        </BottomNavigation>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  friends: state.profile.friends
});

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getFriends, setCurrentTarget, loadUser, getNotifications }
)(withStyles(styles)(Dashboard));
