import sensorModel from "../models/sensors";
import { publishTo } from "./mqtt";
import deviceModel from "../models/devices";

const messageHandler = async (message) => {
  message = JSON.parse(message);
  message = message[0];
  let { device_id, values } = message;
  let value = parseInt(values[0]);
  if (device_id == "Light") {
    sensorModel.updateSensor({ device_id, value });
    let result = await sensorModel.getConditionsByDeviceId(device_id);
    let willExecute = false;
    result.conditions.forEach(async (condition) => {
      if (condition.comparison == 0) {
        willExecute = value == condition.sensorValue;
      } else if (condition.comparison == 1) {
        willExecute = value > condition.sensorValue;
      } else {
        willExecute = value < condition.sensorValue;
      }
      if (willExecute) {
        let targetDevice = await deviceModel.readDeviceById(condition.device);
        publishTo([
          {
            device_id: targetDevice.device_id,
            values: [condition.isOn ? "1" : "0", `${condition.value}`],
          },
        ]);
        await deviceModel.updateToDeviceId(
          targetDevice.device_id,
          condition.value,
          condition.isOn
        );
      }
    });
  }
};

export default messageHandler;
