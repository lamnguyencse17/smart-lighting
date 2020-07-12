import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeAlert } from "./actions/alert";

class AlertModal extends Component {
  render() {
    let { message, show, status } = this.props;
    return (
      <>
        {show && (
          <Alert
            onClose={this.props.closeAlert}
            variant="filled"
            severity={status == 1 ? "success" : "error"}
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
    message: state.alert.msg,
    show: state.alert.show,
    status: state.alert.status,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AlertModal)
);
