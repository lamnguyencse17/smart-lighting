import sensorSchema from "../models/sensors";
import deviceSchema from "../models/devices";

const messageHandler = (message) => {
  message = JSON.parse(message);
  let { device_id, value, isOn} = message;
  // TODO: Update this to normal format
  if (device_id == "LIGHT") {
    sensorSchema.updateSensor({ device_id, value });
  } else {
    deviceSchema.updateDevice({ device_id, value, isOn});
  }
};

export default messageHandler;
