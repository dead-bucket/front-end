import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVert from "@material-ui/icons/MoreVert";
// import { withStyles } from "@material-ui/core";
// import PropTypes from "prop-types";
import axios from "axios";
import API from "../../utils/API";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEntries } from "../../_actions/entryActions";

class EntryMenu extends React.Component {
  state = {
    anchorEl: null,
    showDatePicker: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSendOneEntry = identifier => {
    axios
      .put(API + `/api/v1/entry/${identifier}`, { delivered: true, deliverOn: Date.now() })
      .then(result => {
        if (result.status === 204) {
          this.props.getEntries(this.props.profile.target._id);
        }
      })
      .then(() => this.handleClose())
      .catch(err => console.log(err));
  };
  handleDateSelect = () => {
    this.setState({
      showDatePicker: true
    });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div style={{ position: "absolute", right: "0%", bottom: "1.5%" }}>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVert />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              this.props.deleteModal(this.props.identifier);
              this.handleClose();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => this.handleSendOneEntry(this.props.identifier)}
          >
            Send Now
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.scheduleModal(this.props.identifier);
              this.handleClose();
            }}
          >
            Schedule Send
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

EntryMenu.propTypes = {
  
  profile: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getEntries }
)(EntryMenu);

