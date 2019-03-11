import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { postEntry, getEntries } from "../../_actions/entryActions";

const styles = {
  composeDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  thoughtInput: {
    width: "80%",
    marginBottom: 40
  },
  //style for font size
  resize: {
    fontSize: 15
  },
  colorBlock: {
    height: 30,
    width: 30,
    border: "1px solid #d3d3d3"
  },
  colorBlockActive: {
    height: 30,
    width: 30,
    border: "1px solid #d3d3d3"
  },
  colorContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 40
  }
};

const colors = [
  { id: "blue", hex: "#0abab5" },
  { id: "green", hex: "#98fb98" },
  { id: "white", hex: "#fff" },
  { id: "pink", hex: "#ffc0cb" },
  { id: "red", hex: "#ff0000" }
];

class ComposeForm extends Component {
  state = {
    thought: "",
    thoughtColor: "#fff"
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  selectColorBox = color => {
    this.setState({ thoughtColor: color });
  };

  submitThought = () => {
    const newEntry = {
      recipient: this.props.profile.target._id,
      mood: this.state.thoughtColor,
      description: this.state.thought
    };

    postEntry(newEntry);
    // TODO - have some sort of confirmation for user on successful post
    this.setState({
      thought: "",
      thoughtColor: "#fff"
    });
    this.props.getEntries(this.props.profile.target._id);
  };

  render() {
    const { classes, friend } = this.props;
    const { thoughtColor, thought } = this.state;
    let textMessage;

    if (!friend) {
      textMessage = null;
    } else {
      friend.firstname
        ? (textMessage = `What do you want to say to ${friend.firstname}?`)
        : (textMessage = `What do you want to say to ${friend.username}?`);
    }

    return (
      <div className={classes.composeDiv}>
        <TextField
          label="Enter a thought..."
          multiline
          rows="5"
          style={{ backgroundColor: thoughtColor }}
          value={this.state.thought}
          name="thought"
          placeholder={textMessage}
          className={classes.thoughtInput}
          InputProps={{
            classes: {
              input: classes.resize
            }
          }}
          onChange={this.handleInputChange}
          margin="normal"
          variant="outlined"
        />

        <div className={classes.colorContainer}>
          {colors.map(color => (
            <div
              key={color.id}
              style={{ backgroundColor: color.hex }}
              className={classes.colorBlock}
              onClick={() => this.selectColorBox(color.hex)}
            />
          ))}
        </div>

        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={this.submitThought}
          disabled={!thought}
        >
          Add To Thoughtline
        </Button>
      </div>
    );
  }
}

ComposeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getEntries }
)(withStyles(styles)(ComposeForm));
