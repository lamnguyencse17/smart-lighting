import sensorSchema from "../models/sensors";
import deviceSchema from "../models/devices";

const messageHandler = (message) => {
  message = JSON.parse(message);
  let { device_id, value } = message;
  if (device_id == "d6_1") {
    sensorSchema.updateSensor({ device_id, value });
  } else {
    deviceSchema.updateDevice({ device_id, value });
  }
};

export default messageHandler;
