import React, { Component } from "react";
import DevicePanel from "./DeviceView/DevicePanel";
import { getDevice } from "../actions/device";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DeviceView extends Component {
  componentDidMount() {
    this.props.getDevice(this.props.match.params.id);
    this.update = setInterval(() => {
      this.props.getDevice(this.props.match.params.id);
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  state = {
    history: [],
    deviceState: false,
  };
  render() {
    return (
      <div className="device-view">
        <div className="device-view-content">
          <div className="row1">
            <div className="bedroom-light">{name}</div>
            <a href="#" className="edit">
              EDIT
            </a>
          </div>
          {this.props._id != "" ? (
            <DevicePanel
              name={this.props.name}
              deviceHistory={this.props.deviceHistory}
              _id={this.props._id}
              device_id={this.props.device_id}
            />
          ) : (
            <></>
          )}
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
    deviceHistory: state.device.history,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevice }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceView);
