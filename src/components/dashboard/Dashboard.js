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
import Intro from "./Intro";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteFriendModal from "./removeFriendModal";
import removeFriend from "../common/remove-friend.svg";
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
    marginTop: 20,
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
    overflowY: "auto",
    height: "100%",
    flexGrow: 2
  },
  intro: {
    width: "100%",
    maxWidth: 800,
    textAlign: "center",
    padding: 15,

    fontSize: ".8rem"
  },
  bottomNavigation: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 83,
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
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteLayer: false,
      deleteFriendModalOpen: false
    };
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
      deleteLayer: !this.state.deleteLayer
    });
  };
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
  removeFriend = () => {
    // console.log('removing friend', this.state.friendToRemove);
    axios
      .put(API + "/api/v1/deletefriend", {
        friend: this.state.friendToRemove._id
      })
      .then(res => console.log("response", res.status))
      .then(() => this.handleCloseModal())
      .catch(err => console.log(err));
  };
  handleOpenRemoveModal = friend => {
    // console.log('this is open modal and friend to put in state', friend)
    this.setState({
      deleteFriendModalOpen: true,
      friendToRemove: friend
    });
  };
  handleCloseModal = () => {
    this.setState({
      deleteFriendModalOpen: false,
      deleteLayer: false,
      friendToRemove: null
    });
    this.props.getFriends();
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
            <Intro />
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
            remove={this.handleOpenRemoveModal}
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
        <DeleteFriendModal
          isOpen={this.state.deleteFriendModalOpen}
          yes={this.removeFriend}
          no={this.handleCloseModal}
          friendToDelete={this.state.friendToRemove}
        />
        <BottomNavigation className={classes.bottomNavigation}>
          <AddFriendModal
            refreshTargets={this.props.getFriends}
            toggleDelete={this.toggleDeleteLayer}
          />
          {friends && friends.length > 0 ? (
            <div className={classes.medium}>
              <Tooltip title="Remove Friend">
                <IconButton onClick={() => this.toggleDeleteLayer()}>
                  <img
                    alt="remove friend"
                    className={classes.mediumIcon}
                    src={removeFriend}
                  />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
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
