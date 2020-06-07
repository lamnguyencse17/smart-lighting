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
    let { name, devices, sensors } = this.props;
    return (
      <div className="dashboard">
        <div className="areaview">
          <div className="title">{name}</div>
          <div className="sensor-box"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.area.name,
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
