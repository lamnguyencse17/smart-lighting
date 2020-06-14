import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevice, adjustDevice } from "../../actions/device";
import DeviceSlider from "./DeviceSlider";
import DeviceModal from "./DeviceModal";
import DeviceHistory from "./DeviceHistory"
import DeviceSchedule from "./DeviceSchedule"

class DevicePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceStatus: false,
      modalActive: false,
    };
  }
  componentDidMount() {
    let history = this.props.deviceHistory;
    if (
      history[Object.keys(history)[Object.keys(history).length - 1]].value > 0
    ) {
      this.setState({ deviceStatus: true });
    } else {
      this.setState({ deviceStatus: false });
    }
  }
  componentDidUpdate() {
    let history = this.props.deviceHistory;
    let length = Object.keys(history).length;
    if (history[Object.keys(history)[length - 1]].value > 0) {
      if (this.state.deviceStatus == false) {
        this.setState({ deviceStatus: true });
      }
    } else {
      if (this.state.deviceStatus == true) {
        this.setState({ deviceStatus: false });
      }
    }
  }
  showModal = () => {
    this.setState({ modalActive: true });
  };
  closeModal = () => {
    this.setState({ modalActive: false });
  };
  handleAdjust = (e) => {
    this.props.adjustDevice(this.props.device_id, e.target.checked ? 255 : 0);
    this.setState({
      deviceStatus: e.target.checked,
    });
  };
  render() {
    let {deviceSchedule,deviceHistory} = this.props;
    //REMOVE WHEN SCHEDULE IS IMPLEMENTED, FOR TESTING PURPOSES
    deviceSchedule = this.props.deviceHistory;
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
          <DeviceSlider device_id={this.props.device_id} />
        </div>
        <div className="device-schedule">
          <DeviceModal
            device_id={this.props.device_id}
            active={this.state.modalActive}
            closeModal={() => {
              this.setState({ modalActive: false });
            }}
          />
        </div>
        <DeviceHistory history={deviceHistory}/>
        <DeviceSchedule schedule={deviceSchedule} onAddSchedule={this.showModal}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevice, adjustDevice }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(DevicePanel));