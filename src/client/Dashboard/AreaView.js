import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArea } from "../actions/area";
import Sensor from "./AreaView/Sensor";
import Device from "./AreaView/Device";

class AreaView extends Component {
  update = null;
  componentDidMount() {
    this.props.getArea(this.props.match.params.id);
    this.update = setTimeout(() => {
      this.props.getArea(this.props.match.params.id);
    }, 60000);
  }
  componentWillUnmount() {
    clearTimeout(this.update);
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
                key={index}
                sensorName={sensorName}
                latestReadings={latestReadings}
                readings={readings}
              />
            );
          })}
          {this.props.areaName != "" ? (
            Object.keys(devices).map((index) => {
              let deviceName = devices[index].name;
              let deviceHistory = devices[index].history;
              let _id = devices[index]._id;
              return (
                <Device
                  key={index}
                  deviceName={deviceName}
                  deviceHistory={deviceHistory}
                  _id={_id}
                />
              );
            })
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
