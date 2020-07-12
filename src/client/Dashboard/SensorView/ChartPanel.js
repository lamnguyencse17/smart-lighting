import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

export default class ChartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: [],
      data: [],
      btn24h: false,
      btn3days: false,
      btn5days: false,
    };
  }
  handle24hClick = (e) => {
    this.setState({
      ...this.state,
      btn24h: true,
      btn3days: false,
      btn5days: false,
    });
    this.retrieveData(this.props.id, 0);
  };

  handle3daysClick = (e) => {
    this.setState({
      ...this.state,
      btn24h: false,
      btn3days: true,
      btn5days: false,
    });
    this.retrieveData(this.props.id, 1);
  };

  handle5daysClick = (e) => {
    this.setState({
      ...this.state,
      btn24h: false,
      btn3days: false,
      btn5days: true,
    });
    this.retrieveData(this.props.id, 2);
  };

  retrieveData = (id, duration) => {
    let labels = [];
    let values = [];
    Object.keys(this.props.readings).map((index) => {
      let date = new Date(this.props.readings[index].date);
      let value = this.props.readings[index].value;
      labels.push(date);
      values.push(value);
    });
    const cur_state = {
      labels: this.state.label,
      datasets: [
        {
          label: "Readings",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(0,0,0,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0,0,0,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,0,0,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.data,
        },
      ],
    };
    return (
      <>
        <Line
          data={cur_state}
          options={{
            title: {
              display: true,
              text: "Latest sensor readings",
              fontSize: 20,
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "minute",
                  },
                },
              ],
            },
          }}
        />
        <div className={classes.root}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={this.handle24hClick} disabled={this.state.btn24h}>
              24h
            </Button>
            <Button
              onClick={this.handle3daysClick}
              disabled={this.state.btn3days}
            >
              3 Days
            </Button>
            <Button
              onClick={this.handle5daysClick}
              disabled={this.state.btn5days}
            >
              5 Days
            </Button>
          </ButtonGroup>
        </div>
      </>
    );
  }
}
