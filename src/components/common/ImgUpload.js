import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "react-avatar-edit";

const styles = {
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class ImgUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      src: "https://img.icons8.com/android/100/add8e6/user.png"
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onCrop(preview) {
    this.setState({ preview });
    this.props.updateImg(preview);
  }

  onClose() {
    this.setState({ preview: null });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.uploadContainer}>
        <div>
          <p>Profile Image (Optional):</p>
        </div>
        <div>
          <div>
            <Avatar
              width={150}
              height={150}
              onCrop={this.onCrop}
              onClose={this.onClose}
              // src={this.state.src}
            />
          </div>
          <div className={classes.uploadContainer}>
            <p>Preview:</p>
            <img
              alt=""
              style={{ width: "50px", height: "50px" }}
              src={this.state.preview || this.state.src}
            />
          </div>
        </div>
      </div>
    );
  }
}

// TODO: Proptypes if necessary

export default withStyles(styles)(ImgUpload);
