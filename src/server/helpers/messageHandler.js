import sensorSchema from "../models/sensors";

const messageHandler = (message) => {
  message = JSON.parse(message);
  message = message[0];
  let { device_id, values } = message;
  let value = parseInt(values[0]);
  if (device_id == "Light") {
    sensorSchema.updateSensor({ device_id, value });
  }
  // update value later
};

export default messageHandler;
