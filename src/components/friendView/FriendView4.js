import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/validation";
// import axios from "axios";
// MaterialUI
import { withStyles } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import List from "@material-ui/icons/List";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import MoveToInbox from "@material-ui/icons/MoveToInbox";
import Home from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";

// Custom Components
import NavBar from "../common/NavBar";
import ComposeForm from "./ComposeForm";
import Thoughtline from "./Thoughtline";
import Inbox from "./Inbox";
import FriendCard from "../common/FriendCard";
import Spinner from "../common/Spinner";
import API from "../../utils/API";

//Redux
import { connect } from "react-redux";
import { getEntries, getInboxEntries } from "../../_actions/entryActions";
import { loadUser } from "../../_actions/authActions";
import axios from "axios";

const styles = {
  friendviewWrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative"
  },
  friendContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    flexGrow: 1,
    maxHeight: 152,
    minHeight: 152,
    paddingTop: 10
  },
  actionContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowY: "scroll",
    flexGrow: 3,
    
  },
  bottomNav: {
    flexGrow: 1,
    maxHeight: 56,
    minHeight: 56
  },
  dashboardIconStyle: {
    position: "absolute",
    top: 75,
    left: "10%",
    cursor: "pointer",
    zIndex: 20
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  mediumIcon: {
    width: 32,
    height: 32
  }
};

class FriendView4 extends Component {
  state = {
    value: 1
  };

  componentDidMount() {
    if (isEmpty(this.props.profile)) {
      this.props.history.push("/dashboard");
    } else {
      this.props.getInboxEntries(this.props.profile.target._id);
      this.props.getEntries(this.props.profile.target._id);
    }
  }

  handleBottomChange = (event, value) => {
    this.setState({ value });
  };

  clearNotification = () => {
    if (this.props.currentUser.newmessages.length > 0) {
      setTimeout(() => {
        axios
          .put(API + "/api/v1/inboxclearnotification/", {
            sender: this.props.profile.target._id
          })
          .then(data => {
            // console.log('data back from clearnotification',data.status);
            if (data.status === 204) {
              this.props.loadUser();
            }
          })
          .catch(err => console.log(err));
      }, 3000);
    }
  };

  render() {
    const { classes } = this.props;
    const { target } = this.props.profile;
    const { value } = this.state;
    console.log(this.props.currentUser);
    let actionContent;
    switch (value) {
      case 0:
        actionContent = (
          <Thoughtline name={target.firstname || target.username} />
        );
        break;
      case 1:
        actionContent = <ComposeForm friend={target} />;
        break;
      case 2:
        actionContent = <Inbox name={target.firstname || target.username} />;
        break;
      default:
        return null;
    }

    let friendViewContent;
    let isUser;
    if (!target) {
      friendViewContent = <Spinner />;
    } else {
      isUser = target.firstname ? true : false;
      friendViewContent = (
        <FriendCard
          friend={target}
          loggedInUser={this.props.currentUser}
          view="friendview"
        />
      );
    }

    return (
      <div className={classes.friendviewWrapper}>
        <NavBar />
        <div className={classes.dashboardIconStyle}>
          <Link to="/dashboard">
            <IconButton style={styles.medium}>
              <Home style={styles.mediumIcon} />
            </IconButton>
          </Link>
        </div>
        <div className={classes.friendContainer}>{friendViewContent}</div>
        <div className={classes.actionContainer}>{actionContent}</div>

        <BottomNavigation
          value={value}
          showLabels
          onChange={this.handleBottomChange}
          className={classes.bottomNav}
        >
          <BottomNavigationAction label="Thoughtline" icon={<List />} />
          <BottomNavigationAction label="Compose" icon={<AddCircleOutline />} />
          {isUser ? (
            <BottomNavigationAction
              label="Inbox"
              icon={<MoveToInbox onClick={this.clearNotification} />}
            />
          ) : null}
        </BottomNavigation>
      </div>
    );
  }
}

FriendView4.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired,
  getInboxEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  { getEntries, getInboxEntries, loadUser }
)(withStyles(styles)(FriendView4));
