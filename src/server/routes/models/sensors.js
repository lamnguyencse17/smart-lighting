import express from "express";
import sensorModel from "../../models/sensors";

const router = express.Router();

const arrayToObject = (arr, numLimit = 5) => {
  let result = {};
  arr.slice(-numLimit).forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = newItem;
  });
  return result;
};

router.post("/statistics", async (req, res) => {
  let { _id, duration } = req.body;
  let result = await sensorModel.getReadingsByDuration(_id, duration);
  res.status(200).json(result);
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await sensorModel.readSensorById(id);
  result = {
    ...result,
    conditions: arrayToObject(result.conditions),
    readings: arrayToObject(result.readings),
  };
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, device_id } = req.body;
  let result = await sensorModel.createSensor({ name, device_id });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await sensorModel.deleteSensor(id);
  res.status(200).json(result);
});

module.exports = router;
