import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IntensitySlider from "./ModalComponents/Slider";
import Schedule from "./ModalComponents/Schedule";
import Toggler from "./ModalComponents/Toggler";
import axios from "axios";

class DeviceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      schedule: "",
      isOn: false,
      value: 0,
    };
  }

  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#7beced",
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

  setSchedule = () => {
    if (this.state.schedule != "") {
      let { schedule, value, isOn } = this.state;
      if (value == 0) {
        isOn = false;
      } else {
        isOn = true;
      }
      axios.post("http://localhost:3000/api/models/schedules", {
        schedule,
        value,
        isOn,
        device_id: this.props.device_id,
      });
      this.props.closeModal();
    }
  };
  render() {
    return (
      <Modal
        open={this.props.active}
        onClose={this.props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="schedule-popup">
          <Toggler action={this.handleChangeButton} />
          <IntensitySlider action={this.handleChangeSlider} />
          <Schedule action={this.handleChangeSchedule} />
          <this.ButtonStyle onClick={this.setSchedule}>Set</this.ButtonStyle>
        </div>
      </Modal>
    );
  }
}

export default DeviceModal;
