import express from "express";
import deviceModel from "../../models/devices";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await deviceModel.readDeviceById(id);
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, device_id } = req.body;
  let result = await deviceModel.createDevice({ name, device_id });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await deviceModel.deleteDevice(id);
  res.status(200).json(result);
});

module.exports = router;
