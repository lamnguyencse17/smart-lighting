import express from "express";
import conditionModel from "../../models/conditions";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id } = req.body;
  let result = await conditionModel.readConditionById(id);
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { comparison, on, areas, devices } = req.body;
  let result = await conditionModel.createCondition({
    comparison,
    on,
    areas,
    devices,
  });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await conditionModel.deleteCondition(id);
  res.status(200).json(result);
});

module.exports = router;
