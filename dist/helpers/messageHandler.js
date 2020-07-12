"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sensors = _interopRequireDefault(require("../models/sensors"));

var _executeCondition = _interopRequireDefault(require("./executeCondition"));

var messageHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message) {
    var _message, device_id, values, value;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = JSON.parse(message);
            message = message[0];
            _message = message, device_id = _message.device_id, values = _message.values;
            value = parseInt(values[0]);

            if (device_id == "Light") {
              _sensors["default"].updateSensor({
                device_id: device_id,
                value: value
              });

              (0, _executeCondition["default"])(device_id, values);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function messageHandler(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = messageHandler;
exports["default"] = _default;