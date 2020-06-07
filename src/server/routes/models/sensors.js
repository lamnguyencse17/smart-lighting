import express from "express";
import sensorModel from "../../models/sensors";

const router = express.Router();

const arrayToObject = (arr) => {
  let result = {};
  arr.forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = newItem;
  });
  return result;
};

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await sensorModel.readSensorById(id);
  result = {
    ...result,
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
