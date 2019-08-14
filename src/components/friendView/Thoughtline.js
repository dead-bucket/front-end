import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import _ from "lodash";

// Material UI
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
// import Delete from "@material-ui/icons/Delete";

//Custom
import EntryMenu from "./entryMenu";
import SendEntriesModal from "./SendEntriesModal";
import { getEntries, deleteEntry } from "../../_actions/entryActions";
import DeleteModal from "./delete-thought-modal";
import ScheduleModal from "./scheduleModal";
import API from "../../utils/API";

const styles = theme => ({
  thoughtLineMessage: {
    position: "relative",
    textAlign: "left",
    width: "80%",
    maxWidth: 800,
    borderRadius: 15,
    padding: 20,
    margin: "20px 20px 20px 25px",
    border: "1px solid black",
    webkitBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    mozBoxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)",
    boxShadow: "7px 10px 5px 1px rgba(0,0,0,0.25)"
  },
  dateText: {
    // fontSize: ".7rem"
    fontSize: 16
  },
  messageText: {
    // fontSize: ".9rem"
    fontSize: 20
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
  searchIcon: {
    width: 30,
    height: 30,
    marginTop: 24,
    // zIndex: 20,
    cursor: "pointer",
    color: "#EE5F3F"
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
  },
  deleteIcon: {
    position: "absolute",
    right: "15%",
    bottom: "15%",
    cursor: "pointer"
  },
  scheduleIcon: {
    position: "absolute",
    right: 20,
    top: 15,
    cursor: "pointer"
  },
  deliveredIcon: {
    position: "absolute",
    right: 20,
    bottom: 15,
    cursor: "pointer",
    color: "green"
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
      scheduleModalOpen: false
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

  handleCloseDeleteModal = () => {
    this.setState({
      modalOpen: false,
      idToDelete: null
    });
  };

  handleCloseScheduleModal = () => {
    this.setState({
      scheduleModalOpen: false,
      idToSchedule: null,
      sendDate: ""
    });
  };

  handleOpenDeleteModal = e => {
    // console.log(e);
    this.setState({
      modalOpen: true,
      idToDelete: e
    });
  };
  handleOpenScheduleModal = e => {
    // console.log(e);
    this.setState({
      scheduleModalOpen: true,
      idToSchedule: e
    });
  };
  handleScheduleSend = date => {
    // console.log("schedule date", date);
    // console.log("id to schedule", this.state.idToSchedule);
    axios
      .put(API + `/api/v1/entry/${this.state.idToSchedule}`, {
        deliverOn: new Date(date)
      })
      // .then(response => console.log("put response", response))
      .then(() => {
        this.props.getEntries(this.props.profile.target._id);
        this.handleCloseScheduleModal();
      })
      .catch(err => console.log(err));
  };

  handleDelete = () => {
    this.displaySearchInput();
    axios
      .delete(API + `/api/v1/entry/${this.state.idToDelete}`)
      .then(() => {
        this.props.getEntries(this.props.profile.target._id);
        this.handleCloseDeleteModal();
      })
      .catch(err => console.log(err));
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
              <em className={classes.dateText}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </em>
              <p className={classes.messageText}>{entry.description}</p>
              <EntryMenu
                className={classes.deleteIcon}
                deleteModal={this.handleOpenDeleteModal}
                identifier={entry._id}
                scheduleModal={this.handleOpenScheduleModal}
              />
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
              <em className={classes.dateText}>
                <Moment format="LLL">{entry.createdAt}</Moment>
              </em>
              <p className={classes.messageText}>{entry.description}</p>

              {!entry.delivered ? (
                <EntryMenu
                  className={classes.deleteIcon}
                  deleteModal={this.handleOpenDeleteModal}
                  identifier={entry._id}
                  scheduleModal={this.handleOpenScheduleModal}
                />
              ) : null}
              <i
                style={{
                  display:
                    new Date(entry.deliverOn) >= Date.now() && !entry.delivered
                      ? ""
                      : "none"
                }}
                className={`material-icons ${classes.scheduleIcon}`}
              >
                schedule
              </i>
              <i
                style={{
                  display: entry.delivered && !entry.read ? "" : "none"
                }}
                className={`material-icons ${classes.deliveredIcon}`}
              >
                done
              </i>
              <i
                style={{ display: entry.delivered && entry.read ? "" : "none" }}
                className={`material-icons ${classes.deliveredIcon}`}
              >
                done_all
              </i>
            </div>
          );
        });
      }
    }

    return (
      <div style={{ width: "100%" }}>
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
              autoFocus
              style={{ visibility: displaySearch ? "visible" : "hidden" }}
              name="searchTerm"
              className={classes.searchInput}
              value={this.state.searchTerm}
              onChange={this.handleSearchInput}
              margin="normal"
            />
          </div>
        ) : null}
        {userEntries.length > 0 ? <SendEntriesModal /> : null}
        {userEntries.length > 0 ? (
          <DeleteModal
            isOpen={this.state.modalOpen}
            yes={this.handleDelete}
            no={this.handleCloseDeleteModal}
          />
        ) : null}
        {userEntries.length > 0 ? (
          <ScheduleModal
            isOpen={this.state.scheduleModalOpen}
            yes={this.handleScheduleSend}
            no={this.handleCloseScheduleModal}
            sendDate={this.state.sendDate}
          />
        ) : null}
        <div className={classes.messageContainer}>{messageContent}</div>
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getEntries, deleteEntry }
)(withStyles(styles)(Thoughtline));
