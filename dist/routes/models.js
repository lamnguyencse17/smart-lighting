"use strict";

var express = require("express");

var router = express.Router();
router.use("/areas", function (req, res, next) {
  next();
}, require("./models/areas"));
router.use("/conditions", function (req, res, next) {
  next();
}, require("./models/conditions"));
router.use("/devices", function (req, res, next) {
  next();
}, require("./models/devices"));
router.use("/schedules", function (req, res, next) {
  next();
}, require("./models/schedules"));
router.use("/sensors", function (req, res, next) {
  next();
}, require("./models/sensors"));
router.use("/users", function (req, res, next) {
  next();
}, require("./models/users"));
module.exports = router;