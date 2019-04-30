import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import API from "../../utils/API";



class EntryMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSendOneEntry = (identifier) => {
    axios
    .put(API + `/api/v1/entry/${identifier}`, {delivered: true})
    // .then(result => console.log('result from send one', result))
    .then(() => this.handleClose())
    .catch(err => console.log(err))
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div style={{ position: "absolute", right: "0%", bottom: "1.5%"}}>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
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
          <MenuItem onClick={() => {this.props.deleteModal(this.props.identifier)
                                    this.handleClose()}}>Delete</MenuItem>
          <MenuItem onClick={() => this.handleSendOneEntry(this.props.identifier)
          }>Send Now</MenuItem>
          <MenuItem onClick={this.handleClose}>Schedule Send</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default EntryMenu;