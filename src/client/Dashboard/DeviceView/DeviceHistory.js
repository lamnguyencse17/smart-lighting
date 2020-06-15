import React, { Component } from "react";

class DeviceHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { history } = this.props;
    return (
        <div className="device-history-container">
            <span className="device-history-title">HISTORY</span>
            <div className="device-history-content">
              <ul>
                {Object.keys(history).map((index) => {
                  let device = history[index];
                  let date = new Date(device.date);
                  return (
                    <li className="device-history-item" key={index}>
                      {`${date.getUTCHours()}:${date.getUTCMinutes()} - ${date.getUTCDate()}/${
                        date.getUTCMonth() + 1
                      }/${date.getFullYear()}`}
                      <br></br>
                      {device.value == 2 ? "Turned On" : "Turned OFF"}
                      <br></br>
                    </li>
                  );
                })}
              </ul>
            </div>
        </div>
    );
  }
}

export default DeviceHistory;