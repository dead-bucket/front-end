import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import _ from "lodash";

// Material UI
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

//Custom
import SendEntriesModal from "./SendEntriesModal";

const styles = {
  timelineContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    height: "55vh"
  },

  thoughtLineMessage: {
    textAlign: "left",
    width: "80%",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    border: "1px solid black",
    webkitBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    mozBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    boxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)"
  },
  searchContainer: {
    position: "absolute",
    alignItems: "center",
    top: "280px",
    left: "140px",
    display: "flex"
  },
  searchIcon: {
    width: 40,
    height: 40
  },
  searchInput: {
    width: "256px"
  }
};

class Thoughtline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      displaySearch: false,
      searchResults: null
    };
    this.delayedSearch = _.debounce(this.searchMessages, 1000);
  }

  displaySearchInput = () =>
    this.setState({
      displaySearch: !this.state.displaySearch,
      searchTerm: "",
      searchResults: null
    });

  searchMessages = searchTerm => {
    console.log(searchTerm);
    let searchResults = this.props.userEntries.filter(entry => {
      return entry.description.toLowerCase().includes(searchTerm.toLowerCase())
        ? entry
        : null;
    });
    if (searchResults.length === 0) {
      searchResults = `No search results for '${this.state.searchTerm}'.`;
    }
    this.setState({ searchResults: searchResults });
    console.log(searchResults);
  };

  handleSearchInput = e => {
    const { value } = e.target;
    this.setState({ searchTerm: value });
    e.persist();
    this.delayedSearch(value);
  };

  render() {
    const { classes, userEntries, name } = this.props;
    const { displaySearch, searchResults } = this.state;

    let messageContent;
    if (searchResults) {
      if (typeof searchResults === "string") {
        messageContent = <h3>{searchResults}</h3>;
      } else {
        messageContent = searchResults.map(entry => {
          return (
            <div
              className={classes.thoughtLineMessage}
              style={{ backgroundColor: entry.mood }}
              key={entry._id}
            >
              <p style={{ fontSize: 16 }}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </p>
              <p style={{ fontSize: 20 }}>{entry.description}</p>
            </div>
          );
        });
      }
    } else {
      if (userEntries.length === 0) {
        messageContent = (
          <h3>You haven't composed a thought for {name} yet.</h3>
        );
      } else {
        messageContent = userEntries.map(entry => {
          return (
            <div
              className={classes.thoughtLineMessage}
              style={{ backgroundColor: entry.mood }}
              key={entry._id}
            >
              <p style={{ fontSize: 16 }}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </p>
              <p style={{ fontSize: 20 }}>{entry.description}</p>
            </div>
          );
        });
      }
    }

    return (
      <div className={classes.timelineContainer}>
        <div className={classes.searchContainer}>
          <Search
            className={classes.searchIcon}
            onClick={this.displaySearchInput}
          />
          <TextField
            id="outlined-friend-email-input"
            label="Searching for..."
            className={classes.searchInput}
            type="email"
            style={{ visibility: displaySearch ? "visible" : "hidden" }}
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleSearchInput}
            margin="normal"
            variant="outlined"
          />
        </div>
        {userEntries.length > 0 ? <SendEntriesModal /> : null}
        {messageContent}
      </div>
    );
  }
}

Thoughtline.propTypes = {
  classes: PropTypes.object.isRequired,
  userEntries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userEntries: state.entries.userEntries
});

export default connect(mapStateToProps)(withStyles(styles)(Thoughtline));
