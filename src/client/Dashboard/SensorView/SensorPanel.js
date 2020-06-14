import React, { Component } from "react";
import SensorModal from "./SensorModal";

class SensorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
    };
  }

  showModal = () => {
    this.setState({ modalActive: true });
  };
  closeModal = () => {
    this.setState({ modalActive: false });
  };
  render() {
    let { readings, latestReadings } = this.props;
    console.log(latestReadings);
    let latestDate = new Date(latestReadings.date);
    console.log(latestDate);
    return (
      <div className="sensor-content">
        <div className="sensor-row">
          <div className="sensor-column sensor-column-1">
            <div className="newest-readings">
              <span className="newest-readings-title">Newest Readings</span>
              <br></br>
              <span className="newest-readings-content">
                {latestReadings.value}
              </span>
              <br></br>
              <span className="newest-readings-date">{`last updated: ${latestDate.getUTCHours()}:${latestDate.getUTCMinutes()}`}</span>
            </div>
            <span className="sensor-hi  story-title">HISTORIES</span>
            <div className="sensor-history-content">
              <ul>
                {Object.keys(this.props.readings).map((index) => {
                  let date = new Date(readings[index].date);
                  let value = readings[index].value;
                  return (
                    <li key={index}>
                      <span className="sensor-history-item-date">{`At ${date.getUTCHours()}:${date.getUTCMinutes()}`}</span>
                      <br></br>
                      <span className="sensor-history-item-reading">
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="sensor-column sensor-column-2">
            <div className="sensor-graph"></div>
          </div>
          <div className="device-schedule">
            <SensorModal
              active={this.state.modalActive}
              closeModal={() => {
                this.setState({ modalActive: false });
              }}
            />
          </div>
          <div className="sensor-column sensor-column-3">
            <span className="sensor-trigger-title">TRIGGER CONDITIONS</span>
            <div className="sensor-trigger-content">
              <ul>
                <li className="sensor-trigger-item">
                  <span>Reading: &lt;20 </span>
                  <br></br>
                  <span>Turn on device:</span>
                  <br></br>
                  <span>Garage Light 1</span>
                </li>
                <li className="sensor-trigger-item">
                  <span>Reading: &gt;80 </span>
                  <br></br>
                  <span>Turn off device:</span>
                  <br></br>
                  <span>Garage Light 1</span>
                </li>
              </ul>
              <button className="add-sensor-trigger" onClick={this.showModal}>
                New Trigger
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SensorPanel;
