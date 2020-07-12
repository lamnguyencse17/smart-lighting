"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _devices = _interopRequireDefault(require("../../models/devices"));

var _mqtt = require("../../helpers/mqtt");

var router = _express["default"].Router();

router.post("/sendCommand", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, device_id, value, isOn, values, returnedValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, device_id = _req$body.device_id, value = _req$body.value, isOn = _req$body.isOn;
            values = [isOn ? "1" : "0", "".concat(value)];
            (0, _mqtt.publishTo)([{
              device_id: device_id,
              values: values
            }]);
            _context.next = 5;
            return _devices["default"].updateToDeviceId(device_id, value, isOn);

          case 5:
            returnedValue = _context.sent;
            res.status(200).json(returnedValue);

          case 7:
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
module.exports = router;