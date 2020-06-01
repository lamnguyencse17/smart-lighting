const express = require("express");
const router = express.Router();

router.use(
  "/areas",
  (req, res, next) => {
    next();
  },
  require("./models/areas")
);

router.use(
  "/conditions",
  (req, res, next) => {
    next();
  },
  require("./models/conditions")
);
router.use(
  "/devices",
  (req, res, next) => {
    next();
  },
  require("./models/devices")
);
router.use(
  "/schedules",
  (req, res, next) => {
    next();
  },
  require("./models/schedules")
);
router.use(
  "/sensors",
  (req, res, next) => {
    next();
  },
  require("./models/sensors")
);
router.use(
  "/users",
  (req, res, next) => {
    next();
  },
  require("./models/users")
);

module.exports = router;
