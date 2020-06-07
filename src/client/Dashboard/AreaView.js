import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArea } from "../actions/area";
import Sensor from "./AreaView/Sensor";

class AreaView extends Component {
  componentDidMount() {
    this.props.getArea(this.props.match.params.id);
  }
  render() {
    let { areaName, devices, sensors } = this.props;
    return (
      <div className="dashboard">
        <div className="areaview">
          <div className="title">{areaName}</div>
          {Object.keys(sensors).map((index) => {
            let sensorName = sensors[index].name;
            let latestReadings = sensors[index].readings[0];
            latestReadings.date = new Date(latestReadings.date);
            let readings = sensors[index].readings.slice(
              1,
              sensors[index].length
            );
            return (
              <Sensor
                sensorName={sensorName}
                latestReadings={latestReadings}
                readings={readings}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    areaName: state.area.name,
    devices: state.area.devices,
    sensors: state.area.sensors,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArea }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AreaView)
);
