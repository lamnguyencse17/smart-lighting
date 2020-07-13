import express from "express";
import scheduleModel from "../../models/schedules";
import { setAgenda } from "../../helpers/scheduler";

const router = express.Router();

router.get("/name/:device_id", async (req, res) => {
  let { device_id } = req.params;
  let result = await scheduleModel.readScheduleByDeviceId(device_id);
  res.status(200).json(result);
});

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await scheduleModel.readScheduleById(id);
  return res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { schedule, isOn, value, device_id } = req.body;
  let result = await scheduleModel.createSchedule({
    schedule,
    isOn,
    value,
    device_id,
  });
  await setAgenda(String(result._id));
  return res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await scheduleModel.deleteSchedule(id);
  return res.status(200).json(result);
});

module.exports = router;
