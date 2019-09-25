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
import Tooltip from "@material-ui/core/Tooltip";
// import Delete from "@material-ui/icons/Delete";

// Redux
import {
  getEntries,
  deleteEntry,
  setEntryModalImg
} from "../../_actions/entryActions";
import { loadUser} from "../../_actions/authActions";

//Custom
import EntryMenu from "./entryMenu";
// import Modal from "../common/Modal";
import EditModal from "./editModal";
import SendEntriesModal from "./SendEntriesModal";
import DeleteModal from "./delete-thought-modal";
import ScheduleModal from "./scheduleModal";
import API from "../../utils/API";

const styles = theme => ({
  thoughtLineWrapper: {
    width: "100%",
    height: "100%"
    // position: "relative"
  },

  thoughtLineMessage: {
    position: "relative",
    textAlign: "left",
    width: "80%",
    maxWidth: 800,
    borderRadius: 15,
    lineBreak: "keep-all",
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
    top: 160,
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
  cssLabel: {
    fontSize: ".85rem"
  },
  //style for font size
  resize: {
    fontSize: ".85rem",
    fontWeight: "bold"
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
  },
  trashCanIcon: {
    position: "absolute",
    right: 20,
    bottom: 15,
    cursor: "pointer"
  },
  entryImgContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  entryImage: {
    cursor: "pointer",
    maxHeight: "6rem",
    borderRadius: 15
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
      scheduleModalOpen: false,
      imgModalOpen: false,
      editModalOpen: false,
      editText: "",
      editColor: ""
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
      idToDelete: null,
      displaySearch: false
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
  handleOpenEditModal = (e, editText, editColor) => {
    this.setState({
      editModalOpen: true,
      idToEdit: e,
      editText,
      editColor
    });
  };
  handleCloseEditModal = () => {
    this.setState({
      editModalOpen: false,
      editText: "",
      idToEdit: null
    });
  };
  handleUpdateEditThought = () => {
    return axios
      .put(API + `/api/v1/entry/${this.state.idToEdit}`, {
        description: this.state.editText
      })
      .then(results => {
        if (results.status === 204) {
          this.props.getEntries(this.props.profile.target._id);
          this.handleCloseEditModal();
        }
      })
      .catch(err => console.log(err));
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
        this.props.loadUser()
      })
      .catch(err => console.log(err));
  };

  displayImgModal = imgUrl => {
    this.props.setEntryModalImg({
      entryImgUrl: imgUrl,
      imgModalOpen: !this.props.entryImg.imgModalOpen
    });
  };
  editThought = () => {};
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes, userEntries, name, profile } = this.props;
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
              <p
                className={classes.messageText}
                contentEditable={this.state.editModalOpen}
              >
                {entry.description}
              </p>

              {!entry.delivered && !profile.target.isTarget ? (
                <EntryMenu
                  className={classes.deleteIcon}
                  deleteModal={this.handleOpenDeleteModal}
                  identifier={entry._id}
                  scheduleModal={this.handleOpenScheduleModal}
                  edit={this.handleOpenEditModal}
                  text={entry.description}
                />
              ) : null}
              {!entry.delivered && profile.target.isTarget ? (
                <i
                  className={`material-icons ${classes.trashCanIcon}`}
                  onClick={() => this.handleOpenDeleteModal(entry._id)}
                >
                  delete
                </i>
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
              <div className={classes.entryImgContainer}>
                <img
                  src={entry.image}
                  className={classes.entryImage}
                  style={{ display: !entry.image ? "none" : "" }}
                  alt="memory"
                  onClick={() => this.displayImgModal(entry.image)}
                />
              </div>
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
              {!entry.delivered && !profile.target.isTarget ? (
                <EntryMenu
                  className={classes.deleteIcon}
                  deleteModal={this.handleOpenDeleteModal}
                  identifier={entry._id}
                  scheduleModal={this.handleOpenScheduleModal}
                  edit={this.handleOpenEditModal}
                  text={entry.description}
                  editColor={entry.mood}
                />
              ) : null}
              {!entry.delivered && profile.target.isTarget ? (
                <i
                  className={`material-icons ${classes.trashCanIcon}`}
                  onClick={() => this.handleOpenDeleteModal(entry._id)}
                >
                  delete
                </i>
              ) : null}
              <Tooltip
                title={entry.deliverOn ? entry.deliverOn.slice(0, 10) : ""}
              >
                <i
                  style={{
                    display:
                      new Date(entry.deliverOn) >= Date.now() ? "" : "none"
                  }}
                  className={`material-icons ${classes.scheduleIcon}`}
                >
                  schedule
                </i>
              </Tooltip>
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
              <div className={classes.entryImgContainer}>
                <img
                  src={entry.image}
                  className={classes.entryImage}
                  style={{ display: !entry.image ? "none" : "" }}
                  alt="memory"
                  onClick={() => this.displayImgModal(entry.image)}
                />
              </div>
            </div>
          );
        });
      }
    }

    return (
      <div className={classes.thoughtLineWrapper}>
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
              InputProps={{
                classes: {
                  input: classes.resize
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
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
        {userEntries.length > 0 ? (
          <EditModal
            isOpen={this.state.editModalOpen}
            yes={this.handleUpdateEditThought}
            no={this.handleCloseEditModal}
            text={this.state.editText}
            editColor={this.state.editColor}
            handleChange={this.handleChange}
          />
        ) : null}
        <div className={classes.messageContainer}>{messageContent}</div>
      </div>
    );
  }
}

Thoughtline.propTypes = {
  classes: PropTypes.object.isRequired,
  entryImg: PropTypes.object.isRequired,
  userEntries: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userEntries: state.entries.userEntries,
  profile: state.profile,
  entryImg: state.entries.entryImg,
  currentUser: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  { getEntries, deleteEntry, setEntryModalImg, loadUser }
)(withStyles(styles)(Thoughtline));
