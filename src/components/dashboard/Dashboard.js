import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
// Custom Components
import Spinner from "../common/Spinner";
import FriendCard from "../common/FriendCard";
import AddFriendModal from "./AddFriendModal";

//Redux
import { connect } from "react-redux";
import { setCurrentTarget } from "../../_actions/profileActions";
import { loadUser } from "../../_actions/authActions";

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
    console.log(friend);
    this.props.setCurrentTarget(friend);
    this.props.history.push("/friendview");
  };

  componentDidMount() {
    this.getTargets();

    if (!this.props.currentUser) {
      this.props.loadUser();
    }
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
        <AddFriendModal refreshTargets={this.getTargets} />
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
