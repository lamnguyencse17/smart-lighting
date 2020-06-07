import React, { Component } from "react";

class Device extends Component {
    state = {
        history:[],
        deviceStatus: false
      }
      toggleDevice = (e) => this.setState({
        deviceStatus: e.target.checked
      });
    render() {
    let { index, deviceName, history, deviceStatus } = this.props;
    return (
        <div className="device-box" key={index}>
            <div className="title">{deviceName}</div>
            <div className="device-content">
                <div className="device-status-container">
                  <span className="device-status-title"> status</span><br></br>
                  <span className="device-status">OFF</span>
                </div>
                <div className="device-toggle">
                  <label className="switch">
                    <input type="checkbox" onChange={this.toggleDevice}></input>
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
