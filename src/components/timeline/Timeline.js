import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SendRounded from "@material-ui/icons/SendRounded";
import Icon from "@material-ui/core/Icon";

import "./timeline.css";
// component
import Spinner from "../common/Spinner";

const messages = [
  {
    id: 1,
    title: "HELLO WORLD",
    body: "This is my first thought to you.",
    emoji: "\u{1F60D}",
    value: "love",
    date: "02/08/18"
  },
  {
    id: 2,
    title: "The day you _____",
    body: "I thought of you today and it made me sad.",
    emoji: "\u{1F61F}",
    value: "sad",
    date: "06/20/18"
  },
  {
    id: 3,
    title: "Bob Ross Ipsum",
    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    emoji: "\u{1F604}",
    value: "happy",
    date: "08/01/18"
  },
  {
    id: 4,
    title: "Bob Ross Ipsum",
    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    emoji: "\u{1F604}",
    value: "happy",
    date: "08/01/18"
  }
];

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=1").then(data => {
      console.log(data.data.results);
      this.setState({ friends: data.data.results, loading: false });
    });
  }

  render() {
    const { loading, friends } = this.state;
    let timelineContent;
    let friendImage;
    if (loading) {
      timelineContent = <Spinner />;
    } else {
      timelineContent = messages.map(message => (
        <div className="timeline_message_container z-depth-3" key={message.id}>
          <p className="timeline_message_text">
            <em className="timeline_message_title">{message.title}</em>
            <span>{message.date}</span>
            <span className="right-align emoji">{message.emoji}</span>
          </p>
          <p className="timeline_message_body">{message.body}</p>
        </div>
      ));

      friendImage = (
        <div id="timeline_friend_container">
          <p>Your thoughtline for </p>
          <h1 id="timeline_friendname">{friends[0].name.first}</h1>
          <div className="timeline_friend z-depth-3">
            <img
              alt="profile"
              id="timeline_portrait"
              src={friends[0].picture.large}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div id="timeline">
            <div>{loading ? null : friendImage}</div>
            <div id="friendview_navigation">
              <span>
                <Link to="/received" className="friendview_nav_link">
                  <Icon>arrow_back_ios</Icon>Received
                </Link>
              </span>
              <span className="friendview_seperator"> | </span>
              <span>
                <Link to="/friendview" className="friendview_nav_link">
                  FriendView<Icon>arrow_forward_ios</Icon>
                </Link>
              </span>
            </div>
            <div id="timeline_timeline_container">{timelineContent}</div>
          </div>
        </div>
        <div className="send_button z-depth-5">
          <SendRounded id="send_icon" />
        </div>
      </div>
    );
  }
}

export default Timeline;
