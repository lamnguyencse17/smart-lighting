import express from "express";
import userModel from "../../models/users";

const router = express.Router();

const arrayToObject = (arr) => {
  let result = {};
  arr.forEach((element) => {
    result[element._id] = element.name;
  });
  return result;
};

router.get("/", async (req, res) => {
  let email = req.query.email;
  let result = await userModel.readUserByEmail(email);
  result = {
    ...result,
    areas: arrayToObject(result.areas),
    devices: arrayToObject(result.devices),
    sensors: arrayToObject(result.sensors),
  };
  res.status(200).json(result);
});

router.post("/", async (req, res) => {
  let { name, email } = req.body;
  let result = await userModel.createUser({ name, email });
  res.status(200).json(result);
});

router.delete("/", async (req, res) => {
  let { id } = req.body;
  let result = await userModel.deleteUser(id);
  res.status(200).json(result);
});

module.exports = router;
