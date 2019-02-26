import React, { Component } from "react";
import PropTypes from "prop-types";

// Custom components
import ProfileCard from "./ProfileCard";
import UpdateUser from "./UpdateUser";
import ImgUpload from "../common/ImgUpload";
import Spinner from "../common/Spinner";

// REDUX
import { connect } from "react-redux";
import { loadUser } from "../../_actions/authActions";

// Material UI
import { withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "91vh",
    width: "100vw",
    border: "1px solid black"
  },
  root: {
    width: "80%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },

  updateUserContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  updateUserContainerMobile: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});

class Profile extends Component {
  state = {
    expanded: null,
    image: ""
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleProfileImg = image => {
    this.setState({ image });
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { classes, currentUser } = this.props;
    const { expanded } = this.state;
    let userProfile;
    if (!currentUser) {
      userProfile = <Spinner />;
    } else {
      userProfile = <ProfileCard user={currentUser} />;
    }
    return (
      <div className={classes.profileContainer}>
        <h4 style={{ textAlign: "center", fontFamily: "Satisfy, cursive" }}>
          Your Profile:
        </h4>
        <div>{userProfile}</div>
        <div className={classes.root}>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Edit Profile {window.innerWidth}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Update your profile pic and account details.
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              // TODO - verify this works
              className={
                window.innerWidth < 500
                  ? classes.updateUserContainer
                  : classes.updateUserContainerMobile
              }
            >
              <ImgUpload updateImg={this.handleProfileImg} />

              <UpdateUser userData={currentUser} />

              <p>update fields</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={this.handleChange("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Notifications</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              All Notifications will be shown here.
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={this.handleChange("panel3")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Edit Friends</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              You'll be able to update targets and delete users targets
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel4"}
            onChange={this.handleChange("panel4")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Pending Friend Requests
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              You'll be able to see all of your friend requests
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { loadUser }
)(withStyles(styles)(Profile));
