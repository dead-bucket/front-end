import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "react-avatar-edit";

const styles = {
  uploadContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

class ImgUpload extends Component {
  constructor(props) {
    super(props);
    const src = "https://img.icons8.com/android/100/000000/user.png";
    this.state = {
      preview: null,
      src
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onCrop(preview) {
    this.setState({ preview });
    // preview is a base64 string
    // console.log(preview)
  }

  onClose() {
    this.setState({ preview: null });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <p>Profile Image</p>
          </div>
        </div>
        <div className={classes.uploadContainer}>
          <div>
            <Avatar
              width={150}
              height={150}
              onCrop={this.onCrop}
              onClose={this.onClose}
              // src={this.state.src}
            />
          </div>
          <div>
            <p>Preview</p>
            <img
              alt=""
              style={{ width: "100px", height: "100px" }}
              src={this.state.preview}
            />
          </div>
        </div>
      </div>
    );
  }
}

// TODO: Proptypes if necessary

export default withStyles(styles)(ImgUpload);
