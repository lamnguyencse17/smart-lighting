import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ConditionSelector from "./ModalComponent/ConditionSelecter";
import AreaSelector from "./ModalComponent/AreaSelector";
import DeviceSelector from "./ModalComponent/DeviceSelector";

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
    this.setState({ value: e });
  };

  handleAreaChange = (e) => {
    this.setState({ area: e });
  };

  handleDeviceChange = (e) => {
    this.setState({ device: e });
  };

  handleConditionChange = (e) => {
    this.setState({ condition: e });
  };

  handleDeviceStatusChange = (e) => {
    this.setState({ deviceStatus: !this.deviceStatus });
  };
  setTriggerCondition = () => {
    console.log(this.state);
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
            <AreaSelector action={this.handleAreaChange} />
            <DeviceSelector
              deviceAction={this.handleDeviceChange}
              deviceStatusAction={this.handleDeviceStatusChange}
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

export default SensorModal;
