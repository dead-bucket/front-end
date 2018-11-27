import React, { Component } from "react";
import axios from "axios";
import "./dashboard.css";
// components
import Spinner from "../common/Spinner";
import NavBar from "../common/NavBar";
import AddButton from "../common/AddButton";
import Tooltip from "@material-ui/core/Tooltip";
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
        <NavBar />
        <div className="container">
          <div id="dashboard">
            <h3>Write a thought to...</h3>
            <div id="dashboard_friend_container">{dashboardContent}</div>
          </div>
        </div>
        <Tooltip title="Add a new friend" placement="top">
          <AddButton />
        </Tooltip>
      </div>
    );
  }
}

export default Dashboard;
