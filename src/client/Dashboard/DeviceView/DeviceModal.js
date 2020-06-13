import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import {makeStyles} from "@material-ui/core";
import { nominalTypeHack } from "prop-types";
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Slider from "@material-ui/core/Slider";

class DeviceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : this.props.Active,
      schedule: '',
      isOn: false,
      value: 0,
    };
    this.setSchedule = this.setSchedule.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  PrettoSlider = withStyles({
    root: {
      width: 300,
      color: "#ccc",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#ff85a7",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#7beced",
      margin: "20px",
    },
  })(Button);
  
  useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
  classes = this.useStyles;

  handleChangeSchedule = (e) => {
    this.setState({ schedule: e.target.value });
  };
  
  handleChangeSlider = (e, newValue) => {
    this.setState({ value: newValue });
  };

  handleChangeButton = (e) => {
    this.setState({ isOn: !this.state.isOn });
  };

  setSchedule() {
    if(this.state.schedule != ''){
      let{schedule, value, isOn} = this.state;
      console.log(schedule)
      console.log(value)
      console.log(isOn)
    }
  }

  handleOpen() {
    this.setState({active: true});
  };

  handleClose() {
    this.setState({active: false});
    this.props.action(1);
  };
  render() {
    return(       
      <Modal
        open={this.props.Active}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="schedule-popup">
        <div className="device-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={this.state.isOn}
              onChange={this.handleChangeButton}
            ></input>
            <span className="slider round"></span>
          </label>
        </div>
        <this.PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          max={255}
          value={this.state.value}
          onChange={this.handleChangeSlider}
        />
        <form className={this.classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Choose Time"
            type="datetime-local"
            onChange={this.handleChangeSchedule}
            className={this.classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <this.ButtonStyle onClick={this.setSchedule}>
          Set
        </this.ButtonStyle>
        </div>
      </Modal>
      
      
    )
  }
}

export default DeviceModal;