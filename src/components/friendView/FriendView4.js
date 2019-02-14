import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../utils/isEmpty";
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
import ComposeForm from "./ComposeForm";
import Thoughtline from "./Thoughtline";
import Inbox from "./Inbox";
import FriendCard from "../common/FriendCard";
import Spinner from "../common/Spinner";

//Redux
import { connect } from "react-redux";
import { getEntries, getInboxEntries } from "../../_actions/entryActions";
import { loadUser } from "../../_actions/authActions";
import axios from "axios";


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
  },
  dashboardIconStyle: {
    position: "absolute",
    top: "10%",
    left: "10%"
  },
  medium: {
    width: 60,
    height: 60,
    padding: 12
  },
  mediumIcon: {
    width: 40,
    height: 40
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
      console.log(this.props.profile);
      this.props.getEntries(this.props.profile.target._id);
      this.props.getInboxEntries(this.props.profile.target._id);
    }
  }

  handleBottomChange = (event, value) => {
    this.setState({ value });
  };
  clearNotification() {
    // console.log('propos.profile._id', this.props.profile.target._id);
    setTimeout(() => {
      axios
        .put("/api/v1/inboxclearnotification/", {
          sender: this.props.profile.target._id
        })
        .then(data => {
          // console.log('data back from clearnotification',data.status);
          if(data.status === 204) {
            this.props.loadUser();
          }
          
        })
        .catch(err => console.log(err))

    }, 4000);
  }

  render() {
    const { classes, getEntries } = this.props;
    const { target } = this.props.profile;
    const { value } = this.state;

    let actionContent;
    switch (value) {
      case 0:
        actionContent = <Thoughtline onClick={getEntries(target._id)} />;
        break;
      case 1:
        actionContent = <ComposeForm friend={target} />;
        break;
      case 2:
        actionContent = <Inbox onCLick={this.clearNotification()}/>;
        break;
      default:
        return null;
    }

    let friendViewContent;
    if (!target) {
      friendViewContent = <Spinner />;
    } else {
      friendViewContent = <FriendCard friend={target} loggedInUser={this.props.currentUser} view="friendview" />;
    }

    return (
      <div>
        <div className={classes.dashboardIconStyle}>
          <Link to="/dashboard">
            <IconButton style={styles.medium}>
              <Home style={styles.mediumIcon} />
            </IconButton>
          </Link>
        </div>

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
