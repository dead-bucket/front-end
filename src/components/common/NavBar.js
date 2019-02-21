import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/authActions";
import { isEmpty } from "../../utils/validation";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  title: {
    fontFamily: "Satisfy, cursive",
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  profileContainer: {
    display: "flex"
  },
  profileImage: {
    maxWidth: 30
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.props.logoutUser();
    this.handleClose();
    this.props.history.push("/");
  };

  render() {
    const { classes, currentUser } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <h5 className={classes.title}>Thoughtline</h5>

            {!isEmpty(currentUser) ? (
              <div className={classes.profileContainer}>
                <div>
                  <p>{currentUser.firstname || currentUser.username}</p>
                </div>
                <div>
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <img
                      className={classes.profileImage}
                      src={currentUser.picture}
                      alt="Current User"
                    />
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
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  } //end render
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(withRouter(NavBar)));
