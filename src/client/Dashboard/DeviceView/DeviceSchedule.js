import React, { Component } from "react";
import axios from "axios";
import ScheduleDeleteButton from "./ScheduleDeleteButton";


class DeviceSchedule extends Component {

  constructor(props) {
    super(props);
    this.state={
      schedule: [],
    }
  }
  componentWillReceiveProps() {
    let {device_id}= this.props;
    axios
    .get(`http://localhost:3000/api/models/schedules/name/${device_id}`)
    .then((result, err) => {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_ALERT,
          payload: {
            status: 0,
            msg:
              "Cannot retrieve schedules right now.",
          },
        });
      }else{
        this.setState({...this.state, schedule: result.data});
      }
    });
  }

  
  render() {
    return (
        <div className="device-schedule-container">
            <span className="device-schedule-title">SCHEDULE</span>
            <div className="device-schedule-content">
              <ul>
                {Object.keys(this.state.schedule).map((index) => {
                  let device = this.state.schedule[index];
                  let date = new Date(device.schedule);
                  return (
                    <li className="device-schedule-item" key={index}>
                      {`${date.getUTCHours()}:${date.getUTCMinutes()} - ${date.getUTCDate()}/${
                        date.getUTCMonth() + 1
                      }/${date.getFullYear()}`}
                      <br></br>
                      {device.isOn ? "Turn ON: "+this.props.name : "Turn OFF: "+this.props.name}
                      <br></br>
                      <span>Value: {this.state.schedule[index].value}</span>
                      <br></br>
                      <ScheduleDeleteButton scheduleId={index} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className="add-device-schedule" onClick={this.props.onAddSchedule}>New Schedule</button>
        </div>
        <button
          className="add-device-schedule"
          onClick={this.props.onAddSchedule}
        >
          New Schedule
        </button>
      </div>
    );
  }
}

export default DeviceSchedule;
