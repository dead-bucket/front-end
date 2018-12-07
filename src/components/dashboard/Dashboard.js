import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Tooltip from "@material-ui/core/Tooltip";

// Custom Styles
import "./dashboard.css";
// Custom Components
import Spinner from "../common/Spinner";
// import AddButton from "../common/AddButton";
import AddFriendModal from "./AddFriendModal";

// TODO
//  -Adding a new user: when they click the icon and create a friend, display the friend created in the modal?  If the user exists, show them the badge friend item based on the DB info and let them know the user exists.

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=9").then(data => {
      console.log(data.data.results);
      this.setState({ friends: data.data.results, loading: false });
    });
  }

  render() {
    const { loading, friends } = this.state;
    let dashboardContent;
    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = friends.map(friend => (
        <div className="dashboard_friend z-depth-3" key={friend.cell}>
          <img
            alt=""
            className="responsive-img circle"
            src={friend.picture.large}
          />
          <p className="center-align" id="dashboard_friend_name">
            {friend.name.first} {friend.name.last}
          </p>
        </div>
      ));
    }
    return (
      <div>
        <div className="container">
          <div id="dashboard">
            <h3>Write a thought to...</h3>

            {/* <div id="dashboard_friend_container"> */}
            <Link id="dashboard_friend_container" to="/friendview">
              {dashboardContent}
            </Link>
            {/* </div> */}
          </div>
        </div>
        {/* TODO get tooltip to work */}
        {/* <Tooltip title="Add a new friend" placement="top">
          <AddButton />
        </Tooltip> */}
        <AddFriendModal />
      </div>
    );
  }
}

export default Dashboard;
