import React, { Component } from "react";
import DevicePanel from "./DevicePanel";

class Device extends Component {
  render() {
    let { index, deviceName, history, deviceStatus } = this.props;
    return (
      <div className="device-box" key={index}>
        <div className="title">{deviceName}</div>
        <DevicePanel history= {history} deviceStatus={deviceStatus}/>
      </div>
    );
  }
}

export default Device;
