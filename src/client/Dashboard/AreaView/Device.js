import React, { Component } from "react";

class Device extends Component {
  render() {
    let { index, sensorName, latestReadings, readings } = this.props;
    return (
      <div className="sensor-box" key={index}>
        <div className="title">{sensorName}</div>
        <div className="newest">
          Newest Reading<br></br>
          <h2>
            {`${latestReadings.date.getHours()}-${latestReadings.date.getMinutes()}: ${
              latestReadings.value
            }`}
          </h2>
        </div>
        <div className="history">
          {readings.map((reading) => {
            let newDate = new Date(reading.date);
            return (
              <div key={reading._id}>
                {`${newDate.getHours()}-${newDate.getMinutes()}`}:{" "}
                {reading.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Device;
