import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

export default class SensorSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: "",
    };
  }

  handleChange = (e) => {
    this.setState({ ...this.state, sensor: e.target.value });
    this.props.changeSensor(e.target.value);
  };

  useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  classes = this.useStyles;
  render() {
    return (
      <FormControl
        className={this.classes.margin}
        style={{ minWidth: 180, marginRight: 5 }}
      >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Sensor
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.state.sensor}
          onChange={this.handleChange}
          displayEmpty
          className={this.classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.keys(this.props.sensors).map((id) => {
            return (
              <MenuItem value={id} key={id}>
                <em>{this.props.sensors[id]}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}
