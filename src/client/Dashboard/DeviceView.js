import React, { Component } from "react";

class DeviceView extends Component {
  render() {
    return (
      <div>
        <h1>Device {this.props.match.params.name}</h1>
      </div>
    );
  }
}

export default DeviceView;
