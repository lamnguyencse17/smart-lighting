import sensorModel from "../models/sensors";
import executeCondition from "./executeCondition";


const messageHandler = async (message) => {
  message = JSON.parse(message);
  message = message[0];
  let { device_id, values } = message;
  let value = parseInt(values[0]);
  if (device_id == "Light") {
    sensorModel.updateSensor({ device_id, value });
    executeCondition(device_id,values)
  }
};

export default messageHandler;
