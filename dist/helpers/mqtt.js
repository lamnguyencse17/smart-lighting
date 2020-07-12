"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishTo = exports.subscribeTo = exports.setClient = void 0;

var _mqtt = _interopRequireDefault(require("mqtt"));

var client;

var setClient = function setClient(host) {
  client = _mqtt["default"].connect("mqtt://23.97.56.49"); // update later
  // client = mqtt.connect("mqtt://13.76.250.158:1883", {
  //   username: "BKvm2",
  //   password: "Hcmut_CSE_2020",
  // });

  client.on("connect", function () {
    console.log("Connected to MQTT Broker");
  });
  return client;
};

exports.setClient = setClient;

var subscribeTo = function subscribeTo(topic) {
  client.subscribe(topic, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

exports.subscribeTo = subscribeTo;

var publishTo = function publishTo(data) {
  data.device_id = "LightD";
  data = JSON.stringify(data);
  client.publish("Topic/LightD", data);
};

exports.publishTo = publishTo;