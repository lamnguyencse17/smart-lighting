import express from "express";
import areaModel from "../../models/areas";

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
  let result = await areaModel.readAreaById(id);
  result = {
    ...result,
    devices: arrayToObject(result.devices),
    sensors: arrayToObject(result.sensors),
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
