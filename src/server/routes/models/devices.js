import express from "express";
import deviceModel from "../../models/devices";

const router = express.Router();

const arrayToObject = (arr, numLimit = 5) => {
  let result = {};
  arr.slice(-numLimit).forEach((element) => {
    let { _id, ...newItem } = element;
    result[element._id] = newItem;
  });
  return result;
};

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await deviceModel.readDeviceById(id);
  result = {
    ...result,
    history: arrayToObject(result.history),
  };
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
