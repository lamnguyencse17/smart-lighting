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
    this.setState({ ...this.state, device: e.target.value });
    this.props.deviceAction(e.target.value);
  };

  handleStatusChange = (e) => {
    this.setState({ ...this.state, deviceStatus: e.target.value });
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
            {Object.keys(this.props.devices).map((id) => {
              <MenuItem value={this.props.devices[id]._id} key={id}>
                {this.props.devices[id].name}
              </MenuItem>;
            })}
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
