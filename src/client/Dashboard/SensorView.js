import React, { Component } from "react";
import { getSensor } from "../actions/sensor";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SensorPanel from "./SensorView/SensorPanel";

class SensorView extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {
    this.props.getSensor(this.props.match.params.id);
    this.update = setInterval(() => {
      this.props.getSensor(this.props.match.params.id);
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  state = {
    latestReadings: "",
    history: [],
    triggerConditions: [],
  };
  render() {
    let { readings } = this.props;
    let length = Object.keys(readings).length;
    let latestIndex = Object.keys(readings)[length - 1];
    let latestReadings = readings[latestIndex];
    return (
      <>
        {this.props.name ? (
          <div className="sensor-view">
            <div className="sensor-view-content">
              <div className="row1">
                <div className="bedroom-light">{this.props.name}</div>
                <a href="#" className="edit">
                  EDIT
                </a>
              </div>
              {this.props.name ? (
                <SensorPanel
                  latestReadings={latestReadings}
                  _id={this.props._id}
                  name={this.props.name}
                  device_id={this.props.device_id}
                  readings={this.props.readings}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    _id: state.sensor._id,
    name: state.sensor.name,
    device_id: state.sensor.device_id,
    readings: state.sensor.readings,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSensor }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SensorView)
);
