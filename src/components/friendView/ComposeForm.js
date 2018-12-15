import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  constructor(props) {
    super(props);
    this.state = {
      thought: "",
      thoughtColor: "#0abab5"
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  selectColorBox = color => {
    this.setState({ thoughtColor: color });
  };

  render() {
    const { classes } = this.props;
    const { thoughtColor } = this.state;
    return (
      <div className={classes.composeDiv}>
        <TextField
          label="Enter a thought..."
          multiline
          rows="10"
          style={{ backgroundColor: thoughtColor }}
          value={this.state.thought}
          name="thought"
          placeholder="What do you want to say to [friendname]?"
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
        >
          Add To Thoughtline
        </Button>
      </div>
    );
  }
}

ComposeForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComposeForm);
