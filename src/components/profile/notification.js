import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { loadUser } from "../../_actions/authActions";
// Material UI
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    backgroundColor: " lightblue",
    // height: "20vh",
    width: "100 %",
    // border: "1px solid black"
    marginBottom: 10,

  },
  notificationImage: {
   
  }
})

class Notifications extends Component {
  state = {};

  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const { classes, currentUser } = this.props;
    console.log('current user', currentUser);
    let notifications;
    if(currentUser.notifications.length > 0) {
      notifications = currentUser.notifications.map(notice => {
        // eslint-disable-next-line no-unused-expressions
        console.log('notice in notification.js', notice);
        if (notice.type === 'Friend Request') {
          return(
            <div key={notice._id} className={classes.notificationContainer}>
          <img src={notice.picture} style={{ height: 75, paddingRight: 20}} />
          <p style={{ fontSize: 20}}>Your friend {notice.firstname} {notice.lastname} sent you a connection request</p>

        </div>
          )
        } else {
          return(
          <div key={notice._id} className={classes.notificationContainer}>
            <img src={notice.picture} style={{ height: 75, paddingRight: 20}} />
            <p style={{ fontSize: 20}}>Your friend {notice.firstname} {notice.lastname} has joined Thoughtline</p>
  
          </div>
          )
        }

        })
      console.log('notifications div', notifications)
    }
    return (
      <div>
        {notifications}
      </div>
    )

  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { loadUser }
)(withStyles(styles)(Notifications));