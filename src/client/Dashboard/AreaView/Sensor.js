import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSensor } from "../../actions/sensor";

class Sensor extends Component {
  componentDidMount() {
    this.props.getSensor(this.props._id);
    this.update = setInterval(() => {
      this.props.getSensor(this.props._id);
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  render() {
    let { index, sensorName, latestReadings, readings } = this.props;
    return (
      <div className="sensor-box" key={index}>
        <div className="title">{sensorName}</div>
        <div className="newest">
          Newest Reading<br></br>
          <h2>
            {`${latestReadings.date.getUTCHours()}:${latestReadings.date.getUTCMinutes()} - ${
              latestReadings.value
            }`}
          </h2>
        </div>
        <span className="sensor-history-title">HISTORIES</span>
        <div className="history">
          {readings.map((reading) => {
            let newDate = new Date(reading.date);
            return (
              <div key={reading._id}>
                {`${newDate.getUTCHours()}:${newDate.getUTCMinutes()}`} -{" "}
                {reading.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSensor }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Sensor));
