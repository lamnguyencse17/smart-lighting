import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ConditionSelector from "./ModalComponent/ConditionSelecter";
import AreaSelector from "./ModalComponent/AreaSelector";
import DeviceSelector from "./ModalComponent/DeviceSelector";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class SensorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      area: "",
      device: "",
      value: 0,
      condition: "",
      deviceStatus: false,
    };
  }

  ButtonStyle = withStyles({
    root: {
      backgroundColor: "#373737",
      color: "#fff",
    },
  })(Button);

  handleValueChange = (e) => {
    this.setState({ ...this.state, value: e });
  };

  handleAreaChange = (e) => {
    this.setState({ ...this.state, area: e });
  };

  handleDeviceChange = (e) => {
    this.setState({ ...this.state, device: e });
  };

  handleConditionChange = (e) => {
    this.setState({ ...this.state, condition: e });
  };

  handleDeviceStatusChange = (e) => {
    this.setState({ ...this.state, deviceStatus: !this.deviceStatus });
  };
  setTriggerCondition = () => {
    let { condition, device, area, value, deviceStatus } = this.state;
    axios.post("http://localhost:3000/api/models/schedules", {
      condition,
      value,
      isOn,
      device,
      area,
      isOn: deviceStatus,
    });
    // Callback later
    this.props.closeModal();
  };

  classes = this.useStyles;

  render() {
    return (
      <Modal
        open={this.props.active}
        onClose={this.props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="trigger-popup">
          <div className="device-toggle">
            <AreaSelector
              changeArea={this.handleAreaChange}
              areas={this.props.areas}
            />
            <DeviceSelector
              deviceAction={this.handleDeviceChange}
              deviceStatusAction={this.handleDeviceStatusChange}
              devices={this.props.devices}
            />
          </div>
          <ConditionSelector
            conditionAction={this.handleConditionChange}
            valueAction={this.handleValueChange}
          />
          <div>
            <this.ButtonStyle onClick={this.setTriggerCondition}>
              Set
            </this.ButtonStyle>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    areas: state.user.areas,
    devices: state.user.devices,
    sensors: state.user.sensors,
  };
}

export default withRouter(connect(mapStateToProps, null)(SensorModal));
