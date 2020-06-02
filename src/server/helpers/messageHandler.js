import sensorSchema from "../models/sensors";
import deviceSchema from "../models/devices";

const messageHandler = async (message) => {
  message = JSON.parse(message);
  let { device_id, value } = message;
  if (device_id == "d6_1") {
    // sensor
    let result = await sensorSchema.updateSensor({ device_id, value });
  } else {
    let result = await deviceSchema.updateSensor({ device_id, value });
  }
};

export default messageHandler;
