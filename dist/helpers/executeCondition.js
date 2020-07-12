"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sensors = _interopRequireDefault(require("../models/sensors"));

var _mqtt = require("./mqtt");

var _devices = _interopRequireDefault(require("../models/devices"));

var executeCondition = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(device_id, values) {
    var value, result, willExecute;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            value = parseInt(values[0]);
            _context2.next = 3;
            return _sensors["default"].getConditionsByDeviceId(device_id);

          case 3:
            result = _context2.sent;
            willExecute = false;
            result.conditions.forEach( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(condition) {
                var targetDevice;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (condition.comparison == 0) {
                          willExecute = value == condition.sensorValue;
                        } else if (condition.comparison == 1) {
                          willExecute = value > condition.sensorValue;
                        } else {
                          willExecute = value < condition.sensorValue;
                        }

                        if (!willExecute) {
                          _context.next = 6;
                          break;
                        }

                        targetDevice = condition.device.device_id;
                        (0, _mqtt.publishTo)([{
                          device_id: targetDevice.device_id,
                          values: [condition.isOn ? "1" : "0", "".concat(condition.value)]
                        }]);
                        _context.next = 6;
                        return _devices["default"].updateToDeviceId(targetDevice.device_id, condition.value, condition.isOn);

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function executeCondition(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = executeCondition;
exports["default"] = _default;