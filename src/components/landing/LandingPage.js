import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Login from "./Login";
import "./LandingPage.css";
const notificationPic = require("../common/notification.png");

const styles = theme => ({
  title: {
    fontFamily: "Satisfy, cursive",
    fontSize: "7rem",
    color: "#ee5f3f",
    // marginTop: "5%",
    // marginBottom: "5%",
    // marginLeft: "10%"
    margin: "25px 30px 0px"
  },
  copy: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 18,
    // marginLeft: "10%",
    width: "80%"
  },
  landingLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  landingRight: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1
  },
  titleImg: {
    // marginLeft: 80,
    alignSelf: "center"
  }
});
class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="landing__container">
        <div className={classes.landingLeft}>
          <p className="landing__title" className={classes.title}>
            Thoughtline
          </p>

          <p className={classes.copy}>
            Journaling is a vehicle of emotional exploration, a way to channel
            difficult feelings into healthy and creative outcomes.
          </p>

          <p className={classes.copy}>
            By writing down your thoughts and feelings, you are forced to slow
            down and pay attention to everything that is going on in your life.
            You have to listen rather than run away from your feelings.
          </p>
        </div>
        <div className={classes.landingRight}>
          <img className={classes.titleImg} src={notificationPic} alt="logo" />
        </div>
        <div className="landing__menu">
          <Login />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
