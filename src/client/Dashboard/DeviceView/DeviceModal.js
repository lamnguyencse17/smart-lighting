import React, { Component } from "react";
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import IntensitySlider from "./ModalComponents/Slider";
import Schedule from "./ModalComponents/Schedule";
import Toggler from "./ModalComponents/Toggler"

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
  
  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#7beced",
      margin: "20px",
    },
  })(Button);

  handleChangeSchedule = (e) => {
    this.setState({ schedule: e });
  };
  
  handleChangeSlider = (e) => {
    this.setState({ value: e });
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
        open={this.props.active}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="schedule-popup">
          <Toggler action={this.handleChangeButton}/>
          <IntensitySlider action={this.handleChangeSlider}/>
          <Schedule action={this.handleChangeSchedule}/>
          <this.ButtonStyle onClick={this.setSchedule}>
                Set
          </this.ButtonStyle>
        </div>
      </Modal>
      
      
    )
  }
}

export default DeviceModal;