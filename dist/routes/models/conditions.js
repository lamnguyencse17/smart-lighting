"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _conditions = _interopRequireDefault(require("../../models/conditions"));

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.body.id;
            _context.next = 3;
            return _conditions["default"].readConditionById(id);

          case 3:
            result = _context.sent;
            res.status(200).json(result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, condition, value, sensor, sensorValue, device, area, isOn, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, condition = _req$body.condition, value = _req$body.value, sensor = _req$body.sensor, sensorValue = _req$body.sensorValue, device = _req$body.device, area = _req$body.area, isOn = _req$body.isOn;
            _context2.next = 3;
            return _conditions["default"].createCondition({
              comparison: condition,
              value: value,
              sensor: sensor,
              sensorValue: sensorValue,
              device: device,
              area: area,
              isOn: isOn
            });

          case 3:
            result = _context2.sent;
            res.status(200).json(result);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router["delete"]("/", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.body.id;
            _context3.next = 3;
            return _conditions["default"].deleteCondition(id);

          case 3:
            result = _context3.sent;
            res.status(200).json(result);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;