import express from "express";
import userModel from "../../models/users";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id, email } = req.body;
  let result = await userModel.readUser();
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, email } = req.body;
  let result = await userModel.createUser({ id, email });
  res.status(200).json(result);
});

module.exports = router;
