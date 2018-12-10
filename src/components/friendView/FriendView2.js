import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// component
import Spinner from "../common/Spinner";

// CSS
import "./friendView2.css";

// Roger Feedback:
//  - Slimdown thought input - no title
//   Swipe left/right to cycle through friends
//   Have the thoughtline appear below thought input  as a text conversation
// fix + button styling

// Hook up STORE - Login/Signup / creating friends

const moods = [
  { emoji: "\u{1F60D}", value: "love" },
  { emoji: "\u{1F604}", value: "happy" },
  { emoji: "\u{1F61F}", value: "sad" }
];

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

// Timeline messages
const messages = [
  {
    id: 1,
    title: "HELLO WORLD",
    body: "This is my first thought to you.",
    emoji: "\u{1F60D}",
    value: "love",
    date: "02/08/18",
    sent: true
  },
  {
    id: 5,
    title: "You received this",
    body: "This is my first thought to you.",
    emoji: "\u{1F60D}",
    value: "love",
    date: "02/08/18",
    sent: false
  },
  {
    id: 2,
    title: "The day you _____",
    body: "I thought of you today and it made me sad.",
    emoji: "\u{1F61F}",
    value: "sad",
    date: "06/20/18",
    sent: true
  },
  {
    id: 3,
    title: "Bob Ross Ipsum",
    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    emoji: "\u{1F604}",
    value: "happy",
    date: "08/01/18",
    sent: true
  },
  {
    id: 4,
    title: "Bob Ross Ipsum",
    body:
      "Anytime you learn something your time and energy are not wasted. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. You're meant to have fun in life. Fluff that up. Every single thing in the world has its own personality - and it is up to you to make friends with the little rascals. God gave you this gift of imagination. Use it.",
    emoji: "\u{1F604}",
    value: "happy",
    date: "08/01/18",
    sent: false
  }
];

class FriendView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true,
      mood: "happy",
      title: "",
      message: ""
    };
  }

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=1").then(data => {
      console.log(data.data.results);
      this.setState({ friends: data.data.results, loading: false });
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addThought = () => {
    // TODO - validate inputs
    const newThought = {
      mood: this.state.mood,
      title: this.state.title,
      message: this.state.message
    };
    console.log(newThought);
    this.props.history.push("/dashboard");
  };

  render() {
    const { loading, friends } = this.state;
    const { classes } = this.props;
    let friendViewContent;
    if (loading) {
      friendViewContent = <Spinner />;
    } else {
      friendViewContent = friends.map(friend => (
        <div className="friendview_friend z-depth-3" key={friend.cell}>
          <img
            alt=""
            className="responsive-img circle"
            id="friendview_friend_img"
            src={friend.picture.large}
          />
        </div>
      ));
    }

    let timelineContent = messages.map(message => {
      if (message.sent === true) {
        return (
          <div className="timeline_message_sent z-depth-3" key={message.id}>
            <p className="timeline_message_text">
              <em className="timeline_message_title">{message.title}</em>
              <span>{message.date}</span>
              <span className="right-align emoji">{message.emoji}</span>
            </p>
            <p className="timeline_message_body">{message.body}</p>
          </div>
        );
      } else {
        return (
          <div className="timeline_message_recieved_div" key={message.id}>
            <div className="timeline_message_recieved z-depth-3">
              <p className="timeline_message_text">
                <em className="timeline_message_title">{message.title}</em>
                <span>{message.date}</span>
                <span className="right-align emoji">{message.emoji}</span>
              </p>
              <p className="timeline_message_body">{message.body}</p>
            </div>
          </div>
        );
      }
    });

    return (
      <div className="container">
        <div id="friendview">
          <h5>Your thinking about...</h5>
          <h1 id="friendview_name">
            {this.state.loading ? null : this.state.friends[0].name.first}
          </h1>
          {friendViewContent}
          <Link to="/friendView">
            <button>+ friendView +</button>
          </Link>
          <Link to="/friendView3">
            <button>+ friendView3 +</button>
          </Link>
          <div id="friendview_form_group" className="z-depth-3">
            <form noValidate autoComplete="off">
              <div id="friendview_form_row1">
                <TextField
                  id="outlined-name"
                  label="Thought Title"
                  name="title"
                  fullWidth
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-select-mood"
                  select
                  fullWidth
                  label="Mood"
                  value={this.state.mood}
                  onChange={this.handleChange("mood")}
                  helperText="How are you feeling?"
                  margin="normal"
                  variant="outlined"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {moods.map(mood => (
                    <MenuItem
                      className="emoji"
                      key={mood.value}
                      value={mood.value}
                    >
                      {mood.emoji}
                      {mood.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div id="friendview_form_row2">
                <TextField
                  id="outlined-multiline-static"
                  // TODO - jsx the friends name in the label?
                  label="Your thought about [friendname]"
                  fullWidth
                  multiline
                  rows="8"
                  value={this.state.message}
                  placeholder="What do you want to [friendname]"
                  className={classes.textField}
                  onChange={this.handleChange("message")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <Button
                id="AddFriendModal_submit_btn"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={this.addThought}
              >
                Add Thought
              </Button>
            </form>
          </div>
          <h3>Your Thoughtline</h3>
          <div id="timeline_timeline_container2" className="z-depth-3">
            {timelineContent}
          </div>
        </div>
      </div>
    );
  }
}

FriendView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(FriendView));
