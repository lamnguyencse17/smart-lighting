import React, { Component } from 'react'
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

export default class ChartPanel extends Component {
    constructor(props) {
        super(props);
	}

	render() {
		let labels = [];
		let values = [];
		Object.keys(this.props.readings).map((index) => {
			let date = new Date(this.props.readings[index].date);
			let value = this.props.readings[index].value;
			labels.push(date);
			values.push(value);
		})
		const cur_state = {
			labels: labels,
			datasets: [
			  {
				label: 'Readings',
				fill: false,
				lineTension: 0.4,
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: values,
			  }
			]
		  }
		return (
		  <div>
			<Line
			  data={cur_state}
			  options={{
				title:{
				  display:true,
				  text:'Latest sensor readings',
				  fontSize:20
				},
				legend:{
				  display:true,
				  position:'right'
				},
				scales: {
					xAxes: [{
						type: 'time',
					}]
				}
			  }}
			/>
		  </div>
		);
	  }
}



