import React, { Component } from "react";

class DeviceView extends Component {
  render() {
    return (
      <div class="device-view">
        <div class="device-view-content">
          <div class="row1">      
            <div class="bedroom-light">BEDROOM LIGHT 1</div>
            <div class="edit">EDIT</div>
          </div>
          <div class="device-content">
            <div class="device-status-container">
              <span class="device-status-title"> status</span><br></br>
              <span class="device-status">ON</span>
            </div>
            <div class="device-toggle">
              <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span>
              </label>
            </div>
            <span class="device-history-title">HISTORIES</span>
            <div class="device-history-content">
              <ul>
                <li>
                  9AM - 21/05/2020: Turned on - Manual
                </li>
                <li>
                  12AM - 21/05/2020: Turned off - Automated
                </li>
              </ul>
            </div>
            <button class="add-device-schedule">New Schedule</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceView;
