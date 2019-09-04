import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Camera from "@material-ui/icons/CameraAlt";
import Minus from "@material-ui/icons/IndeterminateCheckBox";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import axios from "axios";
import API from "../../utils/API";
import { getEntries } from "../../_actions/entryActions";

const styles = {
  composeDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    maxWidth: 700,
    marginTop: 10
  },
  thoughtInput: {
    width: "80%",
    marginBottom: 15,
    marginTop: 0
  },

  colorContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "88%",
    marginBottom: 10,
    zIndex: 20
  },
  cssLabel: {
    fontSize: ".85rem"
  },
  //style for font size
  resize: {
    fontSize: ".85rem",
    fontWeight: "bold"
  },
  colorBlock: {
    height: "1rem",
    width: "1rem",
    border: "1px solid #d3d3d3",
    cursor: "pointer"
  },

  photoContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "88%",
    marginTop: ".5rem",
    marginBottom: ".5rem"
  },
  addPhoto: {
    color: "#EE5F3F",
    fontSize: 45,
    cursor: "pointer"
  },
  addPhotoInput: {
    display: "none"
  },
  imgPreview: {
    height: "5rem"
  },
  deletePreviewIcon: {
    color: "#EE5F3F",
    position: "absolute",
    top: 5,
    right: 5,
    cursor: "pointer"
  },
  boxShadow: {
    height: "1.5rem",
    width: "1.5rem",
    webkitBoxShadow: "0px 0px 17px 1px rgba(0,0,0,0.35)",
    mozBoxShadow: "0px 0px 17px 1px rgba(0,0,0,0.35)",
    boxShadow: "0px 0px 17px 1px rgba(0,0,0,0.35)"
  }
};

const colors = [
  { id: "green", hex: "#72ee8a" },
  { id: "yellow", hex: "#eeea72" },
  { id: "white", hex: "#fff" },
  { id: "pink", hex: "#ffc0cb" },
  { id: "purple", hex: "#9c95e4" }
];

class ComposeForm extends Component {
  state = {
    thought: "",
    thoughtColor: "#fff",
    imgBase64: "",
    submittingThought: false
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  selectColorBox = color => {
    this.setState({ thoughtColor: color });
  };
  handleImage = event => {
    let file = event.target.files[0];
    console.log(event.target.files[0]);
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // console.log(reader.result);
        this.setState({
          imgBase64: reader.result
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  submitThought = () => {
    this.setState({ submittingThought: true });
    const newEntry = {
      recipient: this.props.profile.target._id,
      mood: this.state.thoughtColor,
      description: this.state.thought,
      image: this.state.imgBase64
    };

    axios
      .post(API + "/api/v1/entry/", newEntry)
      .then(data => {
        this.setState({
          submittingThought: false,
          thought: "",
          thoughtColor: "#fff",
          imgBase64: ""
        });
        this.props.getEntries(this.props.profile.target._id);
      })
      .catch(err => {
        this.setState({ submittingThought: false });
        console.log(err);
      });
    // TODO - have some sort of confirmation for user on successful post
  };

  render() {
    const { classes, friend } = this.props;
    const { thoughtColor, thought, imgBase64, submittingThought } = this.state;

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
        {submittingThought ? (
          <Spinner />
        ) : (
          <div className={classes.composeDiv}>
            <TextField
              label="Enter a thought..."
              multiline
              rows="4"
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
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel
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
                  className={
                    thoughtColor === color.hex
                      ? classes.boxShadow
                      : classes.colorBlock
                  }
                  onClick={() => this.selectColorBox(color.hex)}
                />
              ))}
            </div>
            <div className={classes.photoContainer}>
              {imgBase64 ? (
                <div style={{ position: "relative" }}>
                  <img
                    className={classes.imgPreview}
                    src={imgBase64}
                    alt="preview"
                  />
                  <Minus
                    className={classes.deletePreviewIcon}
                    onClick={() => this.setState({ imgBase64: "" })}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="file-input">
                    <Camera className={classes.addPhoto} />
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    multiple={false}
                    name="avatar"
                    className={classes.addPhotoInput}
                    onChange={this.handleImage}
                    accept="image/png, image/jpeg"
                  />
                </div>
              )}
            </div>
            {/* {submittingThought ? (
            <Spinner pxSize={100} />
          ) : ( */}
            <Button
              primary
              handleClick={this.submitThought}
              disabled={!thought}
            >
              Create Thought
            </Button>
          </div>
        )}
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
