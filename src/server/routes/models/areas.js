import express from "express";
import areaModel from "../../models/areas";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await areaModel.readAreaById(id);
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
