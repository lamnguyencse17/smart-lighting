import express from "express";
import conditionModel from "../../models/conditions";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await conditionModel.readConditionById(id);
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { condition, value, sensor, sensorValue, device, area, isOn } = req.body;
  let result = await conditionModel.createCondition({
    comparison: condition,
    value,
    sensor,
    sensorValue,
    device,
    area,
    isOn,
  });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await conditionModel.deleteCondition(id);
  res.status(200).json(result);
});

module.exports = router;
