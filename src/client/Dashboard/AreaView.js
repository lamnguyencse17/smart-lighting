import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArea } from "../actions/area";
import Sensor from "./AreaView/Sensor";
import Device from "./AreaView/Device";
import ErrorModal from "../ErrorModal"

class AreaView extends Component {
  update = null;
  componentDidMount() {
    this.props.getArea(this.props.match.params.id);
    this.update = setInterval(() => {
      this.props.getArea(this.props.match.params.id);
    }, 15000);
  }
  updateArea = () => {
    this.props.getArea(this.props.match.params.id);
  };
  componentWillUnmount() {
    clearInterval(this.update);
  }
  render() {
    let { areaName, devices, sensors } = this.props;
    return (
        <div className="dashboard">
        <ErrorModal message={"Test Error in src/client/Dashboard/AreaView"} show={true} />
        <div className="areaview">
          <div className="title">{areaName}</div>
          {this.props.areaName != "" ? (
            Object.keys(sensors).map((index) => {
              let sensorName = sensors[index].name;
              let latestReadings = {...sensors[index].readings[sensors[index].readings.length - 1]};
              latestReadings.date = new Date(latestReadings.date);
              let readings = sensors[index].readings.slice(
                0,
                sensors[index].readings.length - 1
              );
              let device_id = sensors[index].device_id;
              return (
                <Sensor
                  key={index}
                  sensorName={sensorName}
                  latestReadings={latestReadings}
                  readings={readings}
                  _id={index}
                  device_id={device_id}
                />
              );
            })
          ) : (
            <></>
          )}
          {this.props.areaName != "" ? (
            Object.keys(devices).map((index) => {
              let deviceName = devices[index].name;
              let deviceHistory = devices[index].history;
              let device_id = devices[index].device_id;
              return (
                <Device
                  key={index}
                  deviceName={deviceName}
                  deviceHistory={deviceHistory}
                  device_id={device_id}
                  _id={index}
                  updateArea={this.updateArea}
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
