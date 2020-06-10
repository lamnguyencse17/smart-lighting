import express from "express";

const router = express.Router();

router.post("/sendCommand", (req, res) => {
  //TODO
  // req.body: device_id, value
  // import mqtt.js -> publishTo
  //  import deviceModel -> updateToDeviceId(device_id, value) -> res.status(200).json(returnedValue)
});

module.exports = router;
