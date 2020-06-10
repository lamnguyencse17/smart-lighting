import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevice, setDevice } from "../../actions/device";

class Device extends Component {
  update = null;
  toggleDevice = (e) => {
    // Trigger message
    this.props.setDevice(this.props.device_id);
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
    }, 60000);
    let history = this.props.deviceHistory;
    if (history[Object.keys(history)[0]].value == 2) {
      this.setState({ deviceStatus: true });
    } else {
      this.setState({ deviceStatus: false });
    }
  }
  render() {
    let { index, deviceName, history, deviceStatus } = this.props;
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
              {Object.keys(this.props.deviceHistory).map((index) => {
                let device = this.props.deviceHistory[index];
                let date = new Date(device.date);
                return (
                  <li className="device-history-item">
                    {`${date.getHours()}:${date.getMinutes()} - ${date.getUTCDate()}/${date.getMonth()}/${date.getFullYear()}`}
                    <br></br>
                    {device.value == 2 ? "Turned On" : "Turned OFF"}
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
