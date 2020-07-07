import sensorModel from "../models/sensors";
import { publishTo } from "./mqtt";
import deviceModel from "../models/devices";

const executeCondition = async (device_id, values) => {
  let value = parseInt(values[0]);
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
      let targetDevice = condition.device.device_id;
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
};

export default executeCondition;
