import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArea } from "../actions/area";

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
            let readings = sensors[index].readings;
            return (
              <div className="sensor-box" key={index}>
                <div className="title">{sensorName}</div>
                <div className="history">
                  {readings.map((reading) => {
                    let newDate = new Date(reading.date);
                    return (
                      <div key={reading._id}>
                        {`${newDate.getHours()}:${newDate.getMinutes()}`}:{" "}
                        {reading.value}
                      </div>
                    );
                  })}
                </div>
              </div>
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
