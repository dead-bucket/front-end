import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CornerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div style={{ visibility: this.props.showCorner ? 'visible' : 'none'}}> 
        hello
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(CornerMenu));
