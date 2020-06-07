const express = require("express");
const router = express.Router();

router.use(
  "/models",
  (req, res, next) => {
    next();
  },
  require("./models")
);

module.exports = router;
