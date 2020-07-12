import React, { Component } from "react";
import SensorModal from "./SensorModal";
import ChartPanel from "./ChartPanel";
import ConditionView from "./ConditionView";

class SensorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
    };
  }

  showModal = () => {
    this.setState({ ...this.state, modalActive: true });
  };
  closeModal = () => {
    this.setState({ ...this.state, modalActive: false });
  };
  render() {
    let { readings, latestReadings } = this.props;
    let latestDate = new Date(latestReadings.date);
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
            <div className="sensor-graph">
              <ChartPanel id={this.props._id} readings={readings} />
            </div>
          </div>
          <div className="device-schedule">
            <SensorModal
              active={this.state.modalActive}
              closeModal={this.closeModal}
            />
          </div>
          <div className="sensor-column sensor-column-3">
            <span className="sensor-trigger-title">TRIGGER CONDITIONS</span>
            <div className="sensor-trigger-content">
              <ConditionView
                conditions={this.props.conditions}
                removeCondition={this.props.removeCondition}
              />
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
