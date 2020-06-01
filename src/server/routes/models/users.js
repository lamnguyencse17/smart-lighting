import express from "express";
import userModel from "../../models/users";

const router = express.Router();

router.get("/", async (req, res) => {
  let { id, email } = req.body;
  let result;
  if (id) {
    result = await userModel.readUserById(id);
  } else if (email) {
    result = await userModel.readUserByEmail(email);
  } else {
    console.log(req.body);
  }
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, email } = req.body;
  let result = await userModel.createUser({ name, email });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await userModel.deleteUser();
  res.status(200).json(result);
});

module.exports = router;
