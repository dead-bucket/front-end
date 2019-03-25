import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import _ from "lodash";

// Material UI
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Delete";

//Custom
import SendEntriesModal from "./SendEntriesModal";
import { getEntries, deleteEntry } from "../../_actions/entryActions";
import { relative } from "path";
import DeleteModal from "./delete-thought-modal";

const styles = theme => ({
  timelineContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    height: "51vh"
  },

  thoughtLineMessage: {
    position: "relative",
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
  },
  deleteIcon: {
    position: "absolute",
    right: "2%",
    bottom: "10%",
    cursor: "pointer",
  }
});

class Thoughtline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      displaySearch: false,
      searchResults: null,
      modalOpen: false,
    };
    this.delayedSearch = _.debounce(this.searchMessages, 1000);
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  };

  handleSearchInput = e => {
    const { value } = e.target;
    this.setState({ searchTerm: value });
    e.persist();
    this.delayedSearch(value);
  };
  handleCloseModal = () => {
   
    this.setState({
      modalOpen: false,
      idToDelete: null,
    });
  }
  handleOpenModal = (e) => {
    
    this.setState({
      modalOpen: true,
      idToDelete: e,
    })
  }
  handleDelete = () => {
   
    // axios
    // .delete(`api/v1/entry/${this.state.idToDelete}`)
    // deleteEntry(entryId, this.props.profile.target._id)
    .then(() => this.props.getEntries(this.props.profile.target._id))
    .then(() => {
      this.setState({
        modalOpen: false,
        idToDelete: null,
        searchTerm: '',
        searchResults: [],
      })

    })
    .catch(err => console.log(err));
   
    
  }

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
              <p 
              
              style={{ fontSize: 20 }}>{entry.description}</p>
              <i 
                  onClick={this.handleOpenModal.bind(this, entry._id)}
                  className={`material-icons ${classes.deleteIcon}`}>delete
              </i>
              
              
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
              <p          
              style={{ fontSize: 20 }}>{entry.description}</p>
              <i 
                  onClick={this.handleOpenModal.bind(this, entry._id)}
                  className={`material-icons ${classes.deleteIcon}`}>delete
              </i>
              
            </div>
          );
        });
      }
    }

    return (
      <div className={classes.timelineContainer}>
        {userEntries.length > 0 ? (
          <div className={classes.searchContainer}>
            <Search
              className={classes.searchIcon}
              onClick={this.displaySearchInput}
            />
            {/* TODO - Add autofocus - might need refs? */}
            <TextField
              id="outlined-search-input"
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
        {userEntries.length > 0 ? <SendEntriesModal /> : null}
        {userEntries.length > 0 ? 
                <DeleteModal isOpen={this.state.modalOpen}
                yes={this.handleDelete}
                no={this.handleCloseModal}/> 
                : null}
        {messageContent}
      </div>
    );
  }
}

Thoughtline.propTypes = {
  classes: PropTypes.object.isRequired,
  userEntries: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userEntries: state.entries.userEntries,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getEntries, deleteEntry }
  )(withStyles(styles)(Thoughtline));
