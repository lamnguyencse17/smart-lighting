import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeError } from "./actions/error";

class ErrorModal extends Component {
  render() {
    let { message, show } = this.props;
    return (
      <>
        {show && (
          <Alert
            onClose={this.props.closeError}
            variant="filled"
            severity="error"
          >
            {message}
          </Alert>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.error.msg,
    show: state.error.show,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeError }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ErrorModal)
);
