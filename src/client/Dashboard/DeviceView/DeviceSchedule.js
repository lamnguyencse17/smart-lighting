import React, { Component } from "react";

class DeviceSchedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { schedule } = this.props;
    return (
        <div className="device-schedule-container">
            <span className="device-schedule-title">SCHEDULE</span>
            <div className="device-schedule-content">
              <ul>
                {Object.keys(schedule).map((index) => {
                  let device = schedule[index];
                  let date = new Date(device.date);
                  return (
                    <li className="device-schedule-item" key={index}>
                      {`${date.getUTCHours()}:${date.getUTCMinutes()} - ${date.getUTCDate()}/${
                        date.getUTCMonth() + 1
                      }/${date.getFullYear()}`}
                      <br></br>
                      {device.value == 2 ? "Turn On" : "Turn OFF"}
                      <br></br>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className="add-device-schedule" onClick={this.props.onAddSchedule}>New Schedule</button>
        </div>
    );
  }
}

export default DeviceSchedule;