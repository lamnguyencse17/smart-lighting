import express from "express";
import areaModel from "../../models/areas";

const router = express.Router();

const deviceArrayToObject = (arr, numLimit = 5) => {
  let result = {};
  arr.forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = {
      ...newItem,
      history: newItem.history.slice(-numLimit),
    };
  });
  return result;
};

const sensorArrayToObject = (arr, numLimit = 5) => {
  let result = {};
  arr.forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = {
      ...newItem,
      readings: newItem.readings.slice(-numLimit),
    };
  });
  return result;
};

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await areaModel.readAreaById(id);
  result = {
    ...result,
    devices: deviceArrayToObject(result.devices),
    sensors: sensorArrayToObject(result.sensors),
  };
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, sensors, devices } = req.body;
  let result = await areaModel.createArea({ name, sensors, devices });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await areaModel.deleteArea(id);
  res.status(200).json(result);
});

module.exports = router;
