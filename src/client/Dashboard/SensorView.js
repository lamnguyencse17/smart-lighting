import React, { Component } from "react";
import SensorPanel from "./SensorView/SensorPanel";

class SensorView extends Component {
  state = {
    latestReadings: "",
    history: [],
    triggerConditions : []
  }
  render() {
    return (
      <div className="sensor-view">
        <div className="sensor-view-content">
          <div className="row1">      
            <div className="bedroom-light">BEDROOM LIGHT 1</div>
            <a href="#" className="edit">EDIT</a>
          </div>
          <SensorPanel/>
        </div>
      </div>
    );
  }
}

export default SensorView;
