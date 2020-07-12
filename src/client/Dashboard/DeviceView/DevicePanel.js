import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevice, adjustDevice } from "../../actions/device";
import DeviceSlider from "./DeviceSlider";
import DeviceModal from "./DeviceModal";
import DeviceHistory from "./DeviceHistory";
import DeviceSchedule from "./DeviceSchedule";

class DevicePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceStatus: false,
      modalActive: false,
      sliderValue: 0,
    };
  }
  componentDidMount() {
    let history = this.props.deviceHistory;
    let latestIndex = Object.keys(history).length - 1;
    let latestKey = Object.keys(history)[latestIndex];
    if (history[latestKey].value > 0) {
      this.setState({
        ...this.state,
        deviceStatus: true,
        sliderValue: history[latestKey].value,
      });
    } else {
      this.setState({ ...this.state, deviceStatus: false, sliderValue: 0 });
    }
  }
  componentDidUpdate() {
    let history = this.props.deviceHistory;
    let length = Object.keys(history).length;
    if (history[Object.keys(history)[length - 1]].value > 0) {
      if (this.state.deviceStatus == false) {
        this.setState({ ...this.state, deviceStatus: true });
      }
    } else {
      if (this.state.deviceStatus == true) {
        this.setState({ ...this.state, deviceStatus: false });
      }
    }
  }
  showModal = () => {
    this.setState({ ...this.state, modalActive: true });
  };
  closeModal = () => {
    this.setState({ ...this.state, modalActive: false });
  };
  handleAdjust = (e) => {
    this.props.adjustDevice(this.props.device_id, e.target.checked ? 255 : 0);
    this.setState({
      ...this.state,
      deviceStatus: e.target.checked,
      sliderValue: e.target.checked ? 255 : 0,
    });
  };
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
    let { deviceHistory } = this.props;
    return (
      <div className="device-content">
        <div className="device-status-container">
          <span className="device-status-title"> status</span>
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
        </div>
        <div className="device-toggle">
          <DeviceSlider
            device_id={this.props.device_id}
            deviceIntensity={this.state.sliderValue}
            setSliderValue={this.setSliderValue}
          />
        </div>
        <div className="device-schedule">
          <DeviceModal
            device_id={this.props.device_id}
            active={this.state.modalActive}
            closeModal={() => {
              this.setState({ ...this.state, modalActive: false });
            }}
          />
        </div>
        <DeviceHistory history={deviceHistory} />
        <DeviceSchedule
          device_id={this.props.device_id}
          name = {this.props.name}
          onAddSchedule={this.showModal}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevice, adjustDevice }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(DevicePanel));
