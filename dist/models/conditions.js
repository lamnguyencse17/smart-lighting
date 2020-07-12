"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conditionSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _devices = _interopRequireWildcard(require("./devices"));

var _areas = _interopRequireWildcard(require("./areas"));

var _sensors = _interopRequireWildcard(require("./sensors"));

var Conditions = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var conditionSchema = new Conditions({
  comparison: {
    type: Number,
    required: true
  },
  // 0: equal 1: greater 2: smaller
  isOn: {
    type: Boolean,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  sensorValue: {
    type: Number,
    required: true
  },
  area: {
    type: ObjectId,
    ref: "Areas"
  },
  device: {
    type: ObjectId,
    ref: "Devices"
  },
  sensor: {
    type: ObjectId,
    ref: "Sensors"
  }
});
exports.conditionSchema = conditionSchema;

conditionSchema.statics.readConditionById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            }).lean();

          case 2:
            result = _context.sent;
            delete result.__v;
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

conditionSchema.statics.createCondition = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(conditionDetails) {
    var comparison, isOn, area, device, value, sensor, sensorValue, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            comparison = conditionDetails.comparison, isOn = conditionDetails.isOn, area = conditionDetails.area, device = conditionDetails.device, value = conditionDetails.value, sensor = conditionDetails.sensor, sensorValue = conditionDetails.sensorValue;
            _context2.next = 3;
            return this.create({
              comparison: comparison,
              sensorValue: sensorValue,
              isOn: isOn,
              value: value,
              area: area ? area : null,
              device: device ? device : null,
              sensor: sensor ? sensor : null
            });

          case 3:
            result = _context2.sent;
            result = result.toObject();

            _devices["default"].addCondition(device, result._id);

            _sensors["default"].addCondition(sensor, result._id);

            _areas["default"].addCondition(area, result._id);

            delete result.__v;
            return _context2.abrupt("return", result);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

conditionSchema.statics.deleteCondition = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var result, area, device, sensor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.findByIdAndDelete(_mongoose["default"].Types.ObjectId(id));

          case 2:
            result = _context3.sent;
            area = result.area, device = result.device, sensor = result.sensor;
            device && _devices["default"].removeCondition(device, id);
            sensor && _sensors["default"].removeCondition(sensor, id);
            area && _areas["default"].removeCondition(area, id);
            delete result.__v;
            return _context3.abrupt("return", result);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var conditionModel = _mongoose["default"].model("Conditions", conditionSchema);

var _default = conditionModel;
exports["default"] = _default;