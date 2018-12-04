import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// component
import Spinner from "../common/Spinner";

// CSS
import "./friendView.css";

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

class FriendView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true,
      mood: "happy"
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

    return (
      <div className="container">
        <div id="friendview">
          <h5>Your thinking about...</h5>
          <h1 id="friendview_name">
            {this.state.loading ? null : this.state.friends[0].name.first}
          </h1>
          {friendViewContent}
          {this.state.mood}
          <div id="friendview_navigation">
            <span>
              <Link to="/thoughtline" className="friendview_nav_link">
                <Icon>arrow_back_ios</Icon>Thoughtline
              </Link>
            </span>
            <span className="friendview_seperator"> | </span>
            <span>
              <Link to="/received" className="friendview_nav_link">
                Received <Icon>arrow_forward_ios</Icon>
              </Link>
            </span>
          </div>

          <div id="friendview_form_group">
            <form noValidate autoComplete="off">
              <div id="friendview_form_row1">
                <TextField
                  id="outlined-name"
                  label="Thought Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-select-mood"
                  select
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
                  label="Multiline"
                  multiline
                  rows="4"
                  defaultValue="Thought Body"
                  // className={classes.textField}
                  onChange={this.handleChange("mood")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
FriendView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FriendView);
