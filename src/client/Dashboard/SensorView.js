import React, { Component } from "react";
import { getSensor } from "../actions/sensor";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SensorPanel from "./SensorView/SensorPanel";

class SensorView extends Component {
  constructor(props) {
    super(props);
    this.props.getSensor(this.props.match.params.id);
  }
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