"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mqtt = require("./helpers/mqtt");

var _messageHandler = _interopRequireDefault(require("./helpers/messageHandler"));

var _conditions = _interopRequireDefault(require("./models/conditions"));

var _devices = _interopRequireDefault(require("./models/devices"));

var _areas = _interopRequireDefault(require("./models/areas"));

var _scheduler = require("./helpers/scheduler");

var _sensors = _interopRequireDefault(require("./models/sensors"));

var _compression = _interopRequireDefault(require("compression"));

//console.log(timeConverter("2020-08-02T05:19:27.538+00:00"));
var data_uri = "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";

_mongoose["default"].connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

(0, _scheduler.startAgenda)();
var client = (0, _mqtt.setClient)("mqtt://23.97.56.49");
(0, _mqtt.subscribeTo)("Topic/Light");
client.on("message", function (topic, message) {
  (0, _messageHandler["default"])(message);
});
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("tiny"));
app.use((0, _cors["default"])());
app.use((0, _compression["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  res.send("YES");
});
app.use("/api/", require("./routes/routes"));
app.listen(3000, function () {
  return console.info("Running on 3000");
});
process.on("SIGTERM", _scheduler.stopAgenda);
process.on("SIGINT", _scheduler.stopAgenda);