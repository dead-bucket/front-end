import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
const styles = {
  composeDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  thoughtInput: {
    lineSpacing: 2
  },
  //style for font size
  resize: {
    fontSize: 20
  },
  colorBlock: {
    height: 50,
    width: 50
  }
};

class ComposeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thought: "",
      thoughtColor: ""
    };
    // this.selectColorBox = this.selectColorBox.bind(this);
  }

  handleChange = name => event => {
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });
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
          // id="friendview_thought_input"
          // // TODO - jsx the friends name in the label?
          label="Enter a thought..."
          multiline
          fullWidth
          rows="20"
          value={this.state.thought}
          placeholder="What do you want to say to [friendname]?"
          className={classes.thoughtInput}
          InputProps={{
            classes: {
              input: classes.resize
            }
          }}
          onChange={this.handleChange("thought")}
          margin="normal"
          variant="outlined"
        />
        {this.state.thought}
        <div className={classes.colorContainer}>
          Hello
          <div
            className={
              thoughtColor === "blue" ? "colorBlock blue" : "colorBlock"
            }
            name="thoughtColor"
            value="blue"
            onClick={() => this.selectColorBox("blue")}
          >
            {null}
            {thoughtColor}
          </div>
        </div>
      </div>
    );
  }
}

ComposeForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComposeForm);
