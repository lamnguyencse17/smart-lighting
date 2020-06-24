import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import SensorView from "./SensorView";
import DeviceView from "./DeviceView";
import AreaView from "./AreaView";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../actions/user";

// Logged in home in Mockup
class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser("test@gmail.com");
  }
  render() {
    let { areas, devices, sensors } = this.props;
    areas = (typeof areas === 'undefined') ? {} : areas;
    devices = (typeof devices === 'undefined') ? {} : devices;
    sensors = (typeof sensors === 'undefined') ? {} : sensors;
    return (
      <>
        <Route exact path={`${this.props.match.path}/`}>
          <div className="dashboard">
            <div className="dashboard-area">
              <div className="title">YOUR AREAS</div>
              {Object.keys(areas).map((index) => {
                return (
                  <Link key={index} to={`/dashboard/area/${index}`}>
                    <button>{areas[index]}</button>
                  </Link>
                );
              })}
            </div>
            <div className="dashboard-device">
              <div className="title">YOUR DEVICES</div>
              {Object.keys(devices).map((index) => {
                return (
                  <Link key={index} to={`/dashboard/device/${index}`}>
                    <button>{devices[index]}</button>
                  </Link>
                );
              })}
            </div>
            <div className="dashboard-sensor">
              <div className="title">YOUR SENSORS</div>
              {Object.keys(sensors).map((index) => {
                return (
                  <Link key={index} to={`/dashboard/sensor/${index}`}>
                    <button>{sensors[index]}</button>
                  </Link>
                );
              })}
            </div>
          </div>
        </Route>
        <Route
          path={`${this.props.match.path}/area/:id`}
          component={AreaView}
        />
        <Route
          path={`${this.props.match.path}/device/:id`}
          component={DeviceView}
        />
        <Route
          path={`${this.props.match.path}/sensor/:id`}
          component={SensorView}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    areas: state.user.areas,
    devices: state.user.devices,
    sensors: state.user.sensors,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
