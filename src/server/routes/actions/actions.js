import express from "express";
import deviceModel from "../../models/devices";
import { publishTo } from "../../helpers/mqtt";

const router = express.Router();

router.post("/sendCommand", async (req, res) => {
  let { device_id, value, isOn} = req.body;
  let values = [isOn,value];
  publishTo({
    device_id,
    values
  });
  let returnedValue = await deviceModel.updateToDeviceId(device_id, value, isOn);
  res.status(200).json(returnedValue);
});

module.exports = router;