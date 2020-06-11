import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevice, setDevice } from "../../actions/device";

class Device extends Component {
  toggleDevice = (e) => {
    // Trigger message
    this.props.setDevice(this.props.device_id, e.target.checked ? 2 : 0);
    this.props.updateArea();
    this.setState({
      deviceStatus: e.target.checked,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      deviceStatus: false,
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
      history[Object.keys(history)[Object.keys(history).length - 1]].value == 2
    ) {
      this.setState({ deviceStatus: true });
    } else {
      this.setState({ deviceStatus: false });
    }
  }
  componentDidUpdate() {
    let history = this.props.deviceHistory;
    if (
      history[Object.keys(history)[Object.keys(history).length - 1]].value == 2
    ) {
      if (this.state.deviceStatus == false) {
        this.setState({ deviceStatus: true });
      }
    } else {
      if (this.state.deviceStatus == true) {
        this.setState({ deviceStatus: false });
      }
    }
  }
  render() {
    let { index, deviceName, deviceHistory } = this.props;
    return (
      <div className="device-box" key={index}>
        <div className="title">{deviceName}</div>
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
                onChange={this.toggleDevice}
                checked={this.state.deviceStatus}
              ></input>
              <span className="slider round"></span>
            </label>
          </div>
          <span className="device-history-title">HISTORIES</span>
          <div className="device-history-content">
            <ul>
              {Object.keys(deviceHistory).map((index) => {
                let device = deviceHistory[index];
                let date = new Date(device.date);
                return (
                  <li key={index} className="device-history-item">
                    {`${date.getUTCHours()}:${date.getUTCMinutes()} - ${date.getUTCDate()}/${
                      date.getUTCMonth() + 1
                    }/${date.getFullYear()}`}
                    <br></br>
                    {device.value == 2 ? "Turned ON" : "Turned OFF"}
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
  return bindActionCreators({ getDevice, setDevice }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Device));
