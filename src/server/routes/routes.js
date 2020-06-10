const express = require("express");
const router = express.Router();

router.use(
  "/models",
  (req, res, next) => {
    next();
  },
  require("./models")
);

router.use(
  "/actions",
  (req, res, next) => {
    next();
  },
  require("./actions/actions")
);

module.exports = router;
