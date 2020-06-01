import express from "express";
import scheduleModel from "../../models/schedules";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await scheduleModel.readScheduleById(id);
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { date, on, target_devices } = req.body;
  let result = await scheduleModel.createSchedule({ date, on, target_devices });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await scheduleModel.deleteSchedule(id);
  res.status(200).json(result);
});

module.exports = router;
