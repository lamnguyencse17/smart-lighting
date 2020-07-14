import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ConditionSelector from "./ModalComponent/ConditionSelecter";
import AreaSelector from "./ModalComponent/AreaSelector";
import DeviceSelector from "./ModalComponent/DeviceSelector";
import SensorSelector from "./ModalComponent/SensorSelector";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { bindActionCreators } from "redux";

const inititalState = {
  area: "",
  device: "",
  sensor: "",
  sensorValue: 0,
  value: 0,
  condition: 0,
  deviceStatus: false,
};

class SensorModal extends Component {
  constructor(props) {
    super(props);
    this.state = inititalState;
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
  handleSensorValueChange = (e) => {
    this.setState({ ...this.state, sensorValue: e });
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

  handleSensorChange = (e) => {
    this.setState({ ...this.state, sensor: e });
  };

  handleDeviceStatusChange = (e) => {
    this.setState({ ...this.state, deviceStatus: !this.deviceStatus });
  };
  setTriggerCondition = () => {
    if (!this.state.device && !this.state.area) {
      this.props.closeModal();
      this.props.setAlert("Device and Area cannot both be None", 0);
    } else {
      let {
        condition,
        device,
        area,
        value,
        deviceStatus,
        sensorValue,
        sensor,
      } = this.state;
      this.setState({ ...inititalState });
      axios.post(
        "https://smart-lighting-backend.herokuapp.com/api/models/conditions",
        {
          condition,
          value,
          sensor,
          sensorValue,
          device,
          area,
          isOn: deviceStatus,
        }
      );
      this.props.closeModal();
    }
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
              valueAction={this.handleValueChange}
            />
          </div>
          <div className="device-toggle">
            <SensorSelector
              changeSensor={this.handleSensorChange}
              sensors={this.props.sensors}
            />
            <ConditionSelector
              conditionAction={this.handleConditionChange}
              sensorValueAction={this.handleSensorValueChange}
            />
          </div>
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SensorModal)
);
