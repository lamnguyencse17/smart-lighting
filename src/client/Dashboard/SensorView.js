import React, { Component } from "react";

class SensorView extends Component {
  render() {
    return (
      <div>
        <h1>SENSOR {this.props.match.params.name}</h1>
      </div>
    );
  }
}

export default SensorView;
