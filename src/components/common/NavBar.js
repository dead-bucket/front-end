import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/validation";
import NotificationList from "./notification-list";

// Redux
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/authActions";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
// import Link from '@material-ui/core/Link';

const styles = {
  root: {
    fontSize: ".5rem"
  },

  title: {
    fontFamily: "Satisfy, cursive",
    flexGrow: 1,
    margin: 4,
    fontWeight: "normal"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  profileContainer: {
    display: "flex",
    alignItems: "center"
  },
  profileImage: {
    maxWidth: 40,
    marginRight: 10
  },
  link: {
    color: "black"
  },
  notification: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "red",
    color: "white",
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    flexDrirection: "row",
    justifyContent: "center",
    cursor: "pointer"
  },
  notificationList: {
    postition: "fixed",
    width: 300,
    top: 150
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showNotificatons: false
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuSelect = page => {
    this.handleClose();
    this.props.history.push(page);
  };

  handleClose = () => {
    this.setState({ anchorEl: null, showNotificatons: false });
  };

  logout = () => {
    this.props.logoutUser();
    this.handleClose();
    this.props.history.push("/");
  };
  handleClick = e => {
    this.setState({ showNotificatons: !this.state.showNotificatons });
  };
  render() {
    const { classes, currentUser, notifications } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // console.log('notifications', notifications);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <h1 className={classes.title}>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                Thoughtline
              </Link>
            </h1>

            {!isEmpty(currentUser) ? (
              <div className={classes.profileContainer}>
                <div
                  className={classes.notification}
                  style={{
                    display:
                      notifications && notifications.length > 0 ? "" : "none"
                  }}
                  // onClick={() => this.setState({showNotificatons: !this.state.showNotificatons})}
                  onClick={e => this.handleClick(e)}
                  onClose={() => this.setState({ showNotifications: false })}
                >
                  {notifications ? notifications.length : 0}
                </div>

                <img
                  className={classes.profileImage}
                  src={currentUser.picture}
                  alt="Current User"
                />
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  style={{ backgroundColor: "transparent" }}
                  color="inherit"
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleMenuSelect("/dashboard")}>
                    Dashboard
                  </MenuItem>

                  <MenuItem onClick={() => this.handleMenuSelect("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                  <MenuItem>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSexHUomT5AEqG5QO88cEx_IlsTJrUjlClFpvn0G8ksuXqlgKQ/viewform?usp=sf_link"
                    >
                      Give us feedback!
                    </a>
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
        {notifications ? (
          <div
            className={classes.NotificationList}
            style={{ display: this.state.showNotificatons ? "" : "none" }}
          >
            <NotificationList closeList={this.handleClose} />
          </div>
        ) : null}
      </div>
    );
  } //end render
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  notifications: state.profile.notifications
});

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(withRouter(NavBar)));
