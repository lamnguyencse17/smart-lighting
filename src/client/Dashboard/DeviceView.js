import React, { Component } from "react";
import DevicePanel from "./DeviceView/DevicePanel";

class DeviceView extends Component {
  state = {
    history: [],
    deviceState: false,
  };
  render() {
    return (
      <div className="device-view">
        <div className="device-view-content">
          <div className="row1">
            <div className="bedroom-light">BEDROOM LIGHT 1</div>
            <a href="#" className="edit">
              EDIT
            </a>
          </div>
          <DevicePanel history={this.history} deviceState={this.deviceState} />
        </div>
      </div>
    );
  }
}

export default DeviceView;
