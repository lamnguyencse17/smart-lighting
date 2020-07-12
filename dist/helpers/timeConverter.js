"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = require("prop-types");

var timeConverter = function timeConverter(time) {
  //TODO

  /*
  let atPre = time.split("T");
  let date = atPre[0].split("-");
  let hourZone=atPre[1].split("+");
  let hour =hourZone[0].split(":");
  let zone = hourZone[1].split(":");
  */
  var d = new Date(time);
  return "in " + (d.getTime() - Date.now()) / 1000 + " seconds";
};

var _default = timeConverter;
exports["default"] = _default;