import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { MenuItem } from "@material-ui/core";

export default class DeviceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: "",
      deviceStatus: false,
      value: 0,
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

  handleValueChange = (e) => {
    this.setState({ ...this.state, value: e.target.value });
    this.props.valueAction(e.target.value);
  };

  useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 14,
      padding: "5px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: ["Arial", "Roboto", '"Helvetica Neue"', "sans-serif"].join(
        ","
      ),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

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
              return (
                <MenuItem value={id} key={id}>
                  <em>{this.props.devices[id]}</em>
                </MenuItem>
              );
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
        <FormControl style={{ maxWidth: 120, maxHeight: 9 }}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Value
          </InputLabel>
          <this.BootstrapInput
            id="textbox-value"
            value={this.state.value}
            onChange={this.handleValueChange}
          />
        </FormControl>
      </>
    );
  }
}
