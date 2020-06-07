import React, { Component } from "react";
import DevicePanel from "./DeviceView/DevicePanel";
import { getDevice } from "../actions/device";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

var update;
class DeviceView extends Component {
  componentDidMount() {
    this.props.getDevice(this.props.match.params.id);
    update = setTimeout(() => {
      this.props.getDevice(this.props.match.params.id);
    }, 60000);
  }
  componentWillUnmount() {
    clearTimeout(update);
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
