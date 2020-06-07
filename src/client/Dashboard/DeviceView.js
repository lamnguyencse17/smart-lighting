import React, { Component } from "react";
import DevicePanel from "./DeviceView/DevicePanel";
import { getDevice } from "../actions/device";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DeviceView extends Component {
  constructor(props) {
    super(props);
    this.props.getDevice(this.props.match.params.id);
  }
  state = {
    history: [],
    deviceState: false,
  };
  render() {
    let { _id, name, device_id, devicehistory } = this.props;
    return (
      <div className="device-view">
        <div className="device-view-content">
          <div className="row1">
            <div className="bedroom-light">{name}</div>
            <a href="#" className="edit">
              EDIT
            </a>
          </div>
          <DevicePanel history={devicehistory} _id={_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    _id: state.device._id,
    name: state.device.name,
    device_id: state.device.device_id,
    devicehistory: state.device.history,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevice }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeviceView)
);
