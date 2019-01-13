import React, { Component } from "react";
import ReactDOM from "react-dom";
import Avatar from "react-avatar-edit";

class ImgUpload extends Component {
  constructor(props) {
    super(props);
    const src = "https://img.icons8.com/android/100/000000/user.png";
    // const src = SOURCE_PATH + "/einshtein.jpg";
    this.state = {
      preview: null,
      defaultPreview: null,
      src
    };
    this.onCrop = this.onCrop.bind(this);
    this.onCropDefault = this.onCropDefault.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCloseDefault = this.onCloseDefault.bind(this);
  }

  onCropDefault(preview) {
    this.setState({ defaultPreview: preview });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  onCloseDefault() {
    this.setState({ defaultPreview: null });
  }

  onClose() {
    this.setState({ preview: null });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "45px" }}>
          <div className="col-8">
            <h4>Default usage</h4>
            {this.state.preview}
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <Avatar
              width={390}
              height={295}
              onCrop={this.onCropDefault}
              onClose={this.onCloseDefault}
              // src={this.state.src}
            />
          </div>
          <div className="col-2">
            <h5>Preview</h5>
            <img
              alt=""
              style={{ width: "150px", height: "150px" }}
              src={this.state.defaultPreview}
            />
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default ImgUpload;
