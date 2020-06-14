import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

export default class DeviceSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: "",
      deviceStatus: false,
    };
  }

  handleDeviceChange = (e) => {
    this.setState({ device: e.target.value });
    this.props.deviceAction(e.target.value);
  };

  handleStatusChange = (e) => {
    this.setState({ deviceStatus: e.target.value });
    this.props.deviceStatusAction(e.target.value);
  };

  useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  classes = this.useStyles;
  render() {
    return (
      <>
        <FormControl
          className={this.classes.margin}
          style={{ minWidth: 180, marginRight: 5 }}
        >
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Device
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={this.state.device}
            onChange={this.handleDeviceChange}
            displayEmpty
            className={this.classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Device 1</MenuItem>
            <MenuItem value={2}>Device 2</MenuItem>
            <MenuItem value={3}>Device 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={this.classes.margin} style={{ minWidth: 20 }}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={this.state.deviceStatus}
            onChange={this.handleStatusChange}
            displayEmpty
            className={this.classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>On</MenuItem>
            <MenuItem value={false}>Off</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
}
