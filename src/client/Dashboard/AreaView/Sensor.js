import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSensor } from "../../actions/sensor";
import moment from "moment";

class Sensor extends Component {
  componentDidMount() {
    this.props.getSensor(this.props._id);
    this.update = setInterval(() => {
      this.props.getSensor(this.props._id);
    }, 15000);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
  render() {
    let { index, sensorName, latestReadings, readings } = this.props;
    let strSplit = latestReadings.date.toString().split(" ", 5);
    latestReadings.date = {
      time: strSplit[4],
      day: strSplit[2],
      month: strSplit[1],
      year: strSplit[3],
    };

    return (
      <div className="sensor-box" key={index}>
        <div className="title">{sensorName}</div>
        <div className="newest">
          Latest Reading<br></br>
          <h2>{`Date: ${latestReadings.date.day}/${latestReadings.date.month}/${latestReadings.date.year}`}</h2>
          <h2>{`Time: ${latestReadings.date.time}`}</h2>
          <h2>{`Value: ${latestReadings.value}`}</h2>
        </div>
        <span className="sensor-history-title">HISTORIES</span>
        <div className="history">
          {readings.map((reading) => {
            let newDate = moment(new Date(reading.date));
            let split = newDate.toString().split(" ", 5);
            newDate = {
              time: split[4],
              day: split[2],
              month: split[1],
              year: split[3],
            };
            return (
              <div key={reading._id}>
                {`Date: ${newDate.day}/${newDate.month}/${newDate.year}`}<br></br>
                {`Time: ${newDate.time}`}
                <br></br>
                {`Value: ${reading.value}`}
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
