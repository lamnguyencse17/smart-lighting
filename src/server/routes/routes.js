const express = require("express");
const router = express.Router();

router.use(
  "/models",
  (req, res, next) => {
    console.log("check");
    next();
  },
  require("./models")
);

module.exports = router;
