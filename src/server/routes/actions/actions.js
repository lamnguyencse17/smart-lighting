import express from "express";
import deviceModel from "../../models/devices";
import { publishTo } from "../../helpers/mqtt";

const router = express.Router();

router.post("/sendCommand", async (req, res) => {
  publishTo(req.body);
  //TODO:  convert to the format
  let { device_id, value, isOn} = req.body;
  let returnedValue = await deviceModel.updateToDeviceId(device_id, value, isOn);
  res.status(200).json(returnedValue);
});

module.exports = router;