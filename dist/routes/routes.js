"use strict";

var express = require("express");

var router = express.Router();
router.use("/models", function (req, res, next) {
  next();
}, require("./models"));
router.use("/actions", function (req, res, next) {
  next();
}, require("./actions/actions"));
module.exports = router;