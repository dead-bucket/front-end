import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Checkbox from '@material-ui/core/Checkbox';
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { connect } from "react-redux";
// import { loadUser } from "../../_actions/authActions";
// import { getNotifications } from '../../_actions/profileActions';
import { getNotifications } from "../../_actions/profileActions";
import API from "../../utils/API";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 325,
    backgroundColor: "#fff",
    border: "1px solid lightgrey",
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 999
  },
  notificationActions: {
    display: "flex",
    flexDirection: "column-reverse"
  }
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  handelDeleteNotification = notificationId => {
    return axios
      .delete(API + `/api/v1/notifications/${notificationId}`)
      .then(status => console.log("back from delete route status", status))
      .then(() => this.props.getNotifications())
      .catch(err => console.log(err));
  };
  handleAcceptConnection = (notificationId, friendId) => {
    return axios
      .put(API + `/api/v1/acceptfriend/`, { friend: friendId })
      .then(() => this.handelDeleteNotification(notificationId))
      .catch(err => console.log(err));
  };

  render() {
    const { classes, notifications } = this.props;

    if (notifications.length === 0) {
      return (
        <ClickAwayListener onClickAway={() => this.props.closeList()}>
          <List dense className={classes.root}>
            <ListItem key={1} button>
              <ListItemText
                style={{ textAlign: "center" }}
                primary={`You do not have any notifications.`}
              />
            </ListItem>
          </List>
        </ClickAwayListener>
      );
    } else {
      return (
        <ClickAwayListener onClickAway={() => this.props.closeList()}>
          <List dense className={classes.root}>
            {notifications.map(value => {
              // console.log("notifications", value);
              if (value.type === "Friend Request") {
                return (
                  <ListItem key={value._id} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`${value.fromId.picture}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ fontSize: 16 }}
                      primary={`Your Friend ${value.fromId.firstname} ${
                        value.fromId.lastname
                      } sent you a connection request`}
                    />
                    <ListItemSecondaryAction
                      className={classes.notificationActions}
                    >
                      <IconButton
                        aria-label="Delete"
                        onClick={() => this.handelDeleteNotification(value._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="CheckCircle"
                        onClick={() =>
                          this.handleAcceptConnection(
                            value._id,
                            value.fromId._id
                          )
                        }
                      >
                        <CheckCircle />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={value._id} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`${value.fromId.picture}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ fontSize: 16 }}
                      primary={`Your Friend ${value.fromId.firstname} ${
                        value.fromId.lastname
                      } has joined Thoughtline. Try resending your thoughts.`}
                    />
                    <ListItemSecondaryAction
                      className={classes.notificationActions}
                    >
                      <IconButton aria-label="Delete">
                        <DeleteIcon
                          onClick={() =>
                            this.handelDeleteNotification(value._id)
                          }
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              }
            })}
          </List>
        </ClickAwayListener>
      );
    }
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  // currentUser: state.auth.currentUser,
  notifications: state.profile.notifications
});

export default connect(
  mapStateToProps,
  { getNotifications }
)(withStyles(styles)(CheckboxListSecondary));
