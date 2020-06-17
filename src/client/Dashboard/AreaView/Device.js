import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevice, adjustDevice } from "../../actions/device";
import moment from "moment";
import AreaViewSlider from "./AreaViewSlider";

class Device extends Component {
  handleAdjust = (e) => {
    // Trigger message
    this.props.adjustDevice(this.props.device_id, e.target.checked ? 255 : 0);
    this.props.updateArea();
    this.setState({
      ...this.state,
      deviceStatus: e.target.checked,
      sliderValue: e.target.checked ? 255 : 0,
    });
  };
  constructor(props) {
    super(props);
    let initialValue =
      props.deviceHistory[props.deviceHistory.length - 1].value;
    this.state = {
      deviceStatus: initialValue > 0 ? true : false,
      sliderValue: 0,
    };
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  componentDidMount() {
    this.update = setInterval(() => {
      this.props.getDevice(this.props._id);
    }, 15000);
    let history = this.props.deviceHistory;
    if (
      history[Object.keys(history)[Object.keys(history).length - 1]].value > 0
    ) {
      this.setState({
        ...this.state,
        deviceStatus: true,
        sliderValue:
          history[Object.keys(history)[Object.keys(history).length - 1]].value,
      });
    } else {
      this.setState({
        ...this.state,
        deviceStatus: false,
        sliderValue:
          history[Object.keys(history)[Object.keys(history).length - 1]].value,
      });
    }
  }
  componentDidUpdate() {
    let history = this.props.deviceHistory;
    if (
      history[Object.keys(history)[Object.keys(history).length - 1]].value > 0
    ) {
      if (this.state.deviceStatus == false) {
        this.setState({ ...this.state, deviceStatus: true });
      }
    } else {
      if (this.state.deviceStatus == true) {
        this.setState({ ...this.state, deviceStatus: false });
      }
    }
  }
  setSliderValue = (value) => {
    if (this.state.deviceStatus) {
      if (value > 0) {
        this.setState({
          ...this.state,
          sliderValue: value,
          deviceStatus: true,
        });
      } else {
        this.setState({
          ...this.state,
          sliderValue: value,
          deviceStatus: false,
        });
      }
    } else {
      if (value > 0) {
        this.setState({
          ...this.state,
          sliderValue: value,
          deviceStatus: true,
        });
      } else {
        this.setState({
          ...this.state,
          sliderValue: value,
          deviceStatus: false,
        });
      }
    }
  };
  render() {
    let { index, deviceName, deviceHistory } = this.props;
    return (
      <div className="device-box" key={index}>
        <div className="title">{deviceName}</div>
        <div className="device-content">
          <div className="device-status-container">
            <span className="device-status-title"> Status</span>
            <br></br>
            <span className="device-status">
              {!this.state.deviceStatus ? "OFF" : "ON"}
            </span>
          </div>
          <div className="device-toggle">
            <label className="switch">
              <input
                type="checkbox"
                onChange={this.handleAdjust}
                checked={this.state.deviceStatus}
              ></input>
              <span className="slider round"></span>
            </label>
            <div className="device-toggle">
              <AreaViewSlider
                device_id={this.props.device_id}
                deviceIntensity={this.state.sliderValue}
                setSliderValue={this.setSliderValue}
              />
            </div>
          </div>
          <span className="device-history-title">HISTORIES</span>
          <div className="device-history-content">
            <ul>
              {Object.keys(deviceHistory).map((index) => {
                let device = deviceHistory[index];
                let date = moment(new Date(device.date));
                let split = date.toString().split(" ", 5);
                let dates = {
                  time: split[4],
                  day: split[2],
                  month: split[1],
                  year: split[3],
                };
                return (
                  <li key={index} className="device-history-item">
                    {`${dates.day}/${dates.month}/${dates.year} - ${dates.time}`}
                    <br></br>
                    {device.value > 0 ? "Turned ON" : "Turned OFF"}
                    <br></br>
                  </li>
                );
              })}
            </ul>
          </div>
          <button className="add-device-schedule">New Schedule</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevice, adjustDevice }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Device));
