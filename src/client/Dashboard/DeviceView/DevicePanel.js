import React, { Component } from "react";

class DevicePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceStatus: false,
    };
  }
  componentDidMount() {
    let history = this.props.deviceHistory;
    if (history[Object.keys(history)[0]].value == 2) {
      this.setState({ deviceStatus: true });
    } else {
      this.setState({ deviceStatus: false });
    }
  }
  toggleDevice = (e) => {
    // Trigger message
    this.setState({
      deviceStatus: e.target.checked,
    });
  };
  render() {
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
              console.log(device.date)
              return (
                <li className="device-history-item">
                  {`${date.getUTCHours()}:${date.getUTCMinutes()} - ${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`}
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
    );
  }
}

export default DevicePanel;
