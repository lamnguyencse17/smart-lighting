import React, { Component } from "react";

class Device extends Component {
  update = null;
  toggleDevice = (e) => {
    // Trigger message
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
    clearTimeout(this.update);
  }
  componentDidMount() {
    this.update = setTimeout(() => {
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
            <span className="device-status">OFF</span>
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
              <li className="device-history-item">
                9AM - 21/05/2020:<br></br>Turned on - Manual<br></br>
              </li>
              <li className="device-history-item">
                12AM - 21/05/2020:<br></br> Turned off - Automated<br></br>
              </li>
            </ul>
          </div>
          <button className="add-device-schedule">New Schedule</button>
        </div>
      </div>
    );
  }
}

export default Device;
