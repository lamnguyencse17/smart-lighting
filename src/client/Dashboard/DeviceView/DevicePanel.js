import React, { Component } from 'react'

class DevicePanel extends Component {
    state = {
        history:[],
        deviceStatus: false
      }
      toggleDevice = (e) => this.setState({
        deviceStatus: e.target.checked
      });
    render (){
        return(
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
                    <li>
                      <span className="device-history-time">9AM - 21/05/2020:</span><span className="device-history-status">Turned on - Manual</span>
                    </li>
                    <li>
                    <span className="device-history-time">12AM - 21/05/2020:</span><span className="device-history-status"> Turned off - Automated</span>
                    </li>
                  </ul>
                </div>
                <button className="add-device-schedule">New Schedule</button>
            </div>
        )
    }
}

export default DevicePanel;
