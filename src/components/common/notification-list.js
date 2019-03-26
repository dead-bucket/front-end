import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "lightgrey",
    position: "absolute",
    top: 75,
    right: 50,
    zIndex: 999,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  handelDeleteNotification = (notificationId) => {
    return axios
    .delete(`/api/v1/notifications/${notificationId}`)
    
    .then(status => console.log('back from delete route status', status))
    .catch(err => console.log(err));

  }

  render() {
    const { classes, notifications } = this.props;

    return (
      <ClickAwayListener  onClickAway={() => this.props.closeList()}>
        <List dense className={classes.root} >
          {notifications.map(value => (
            <ListItem key={value._id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`${value.fromId.picture}`}
                />
              </ListItemAvatar>
              <ListItemText 
              primary={`Your Friend ${value.fromId.firstname} ${value.fromId.lastname} has joined Thoughtline. Try resending your thoughts.`} 
              />
              <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon onClick={() => this.handelDeleteNotification(value._id)}/>
                      </IconButton>
                    </ListItemSecondaryAction>
              
            </ListItem>
          ))}
        </List>

      </ClickAwayListener>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
