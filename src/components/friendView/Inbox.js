import React, { Component } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import _ from "lodash";

// Material UI
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core";

const styles = {
  inboxMessage: {
    textAlign: "left",
    width: "80%",
    maxWidth: 800,
    borderRadius: 15,
    margin: "20px 20px 20px 25px",
    padding: 20,

    border: "1px solid black",
    webkitBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    mozBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    boxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)"
  },
  searchContainer: {
    position: "absolute",
    alignItems: "center",
    width: 240,
    top: 172,
    left: "10%",
    marginLeft: "17px",
    display: "flex"
  },
  dateText: {
    // fontSize: ".7rem"
    fontSize: 16
  },
  messageText: {
    // fontSize: ".9rem"
    fontSize: 20
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginTop: 24,
    color: "#EE5F3F",
    cursor: "pointer"
  },
  searchInput: {
    backgroundColor: "#87CEFA"
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    height: "100%"
  }
};

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      displaySearch: false,
      searchResults: null
    };

    this.delayedSearch = _.debounce(this.searchMessages, 1000);
  }

  displaySearchInput = () => {
    this.setState({
      displaySearch: !this.state.displaySearch,
      searchTerm: "",
      searchResults: null
    });
  };

  searchMessages = searchTerm => {
    let searchResults = this.props.inboxEntries.filter(entry => {
      return entry.description.toLowerCase().includes(searchTerm.toLowerCase())
        ? entry
        : null;
    });

    if (searchResults.length === 0) {
      searchResults = `No search results for '${this.state.searchTerm}'.`;
    }
    this.setState({ searchResults: searchResults });
  };

  handleSearchInput = e => {
    const { value } = e.target;
    this.setState({ searchTerm: value });
    e.persist();
    this.delayedSearch(value);
  };
  render() {
    const { classes, inboxEntries, name } = this.props;
    const { displaySearch, searchResults } = this.state;

    let messageContent;
    if (searchResults) {
      if (typeof searchResults === "string") {
        messageContent = <h3>{searchResults}</h3>;
      } else {
        messageContent = searchResults.map(entry => {
          return (
            <div
              className={classes.inboxMessage}
              style={{ backgroundColor: entry.mood }}
              key={entry._id}
            >
              <em className={classes.dateText}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </em>
              <p className={classes.messageText}>{entry.description}</p>
            </div>
          );
        });
      }
    } else {
      if (inboxEntries.length === 0) {
        messageContent = (
          <h3>You haven't received a thought from {name} yet.</h3>
        );
      } else {
        messageContent = inboxEntries.map(entry => {
          return (
            <div
              className={classes.inboxMessage}
              style={{ backgroundColor: entry.mood }}
              key={entry._id}
            >
              <em className={classes.dateText}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </em>
              <p className={classes.messageText}>{entry.description}</p>
            </div>
          );
        });
      }
    }

    /* TODO - Add autofocus - might need refs? */
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className={classes.messageContainer}>
          {inboxEntries.length > 0 ? (
            <div className={classes.searchContainer}>
              <Search
                className={classes.searchIcon}
                onClick={this.displaySearchInput}
              />
              <TextField
                id="searchTerm"
                label="Searching for..."
                type="text"
                style={{ visibility: displaySearch ? "visible" : "hidden" }}
                name="searchTerm"
                className={classes.searchInput}
                value={this.state.searchTerm}
                onChange={this.handleSearchInput}
                margin="normal"
              />
            </div>
          ) : null}
          {messageContent}
        </div>
      </div>
    );
  }
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
  inboxEntries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  inboxEntries: state.entries.inboxEntries
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Inbox));

// export default withStyles(styles)(Inbox);
