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
  inboxContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    height: "51vh"
  },
  inboxMessage: {
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
    width: 240,
    top: 280,
    left: "10%",
    marginLeft: "14px",
    display: "flex"
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginTop: 24
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
    console.log(searchTerm);
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
              <p style={{ fontSize: 16 }}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </p>
              <p style={{ fontSize: 20 }}>{entry.description}</p>
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
              <p style={{ fontSize: 16 }}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </p>
              <p style={{ fontSize: 20 }}>{entry.description}</p>
            </div>
          );
        });
      }
    }

    /* TODO - Add autofocus - might need refs? */
    return (
      <div className={classes.inboxContainer}>
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
              value={this.state.searchTerm}
              onChange={this.handleSearchInput}
              margin="normal"
            />
          </div>
        ) : null}
        {messageContent}
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
