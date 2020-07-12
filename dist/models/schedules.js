"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.scheduleSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schedules = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var scheduleSchema = new Schedules({
  schedule: {
    type: Date,
    required: true
  },
  isOn: {
    type: Boolean,
    required: true
  },
  value: {
    type: Number,
    requires: true
  },
  done: {
    type: Boolean,
    "default": false
  },
  device_id: {
    type: String
  }
});
exports.scheduleSchema = scheduleSchema;

scheduleSchema.statics.readScheduleById = /*#__PURE__*/function () {
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

scheduleSchema.statics.createSchedule = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(scheduleDetails) {
    var schedule, isOn, value, device_id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            schedule = scheduleDetails.schedule, isOn = scheduleDetails.isOn, value = scheduleDetails.value, device_id = scheduleDetails.device_id;
            _context2.next = 3;
            return this.create({
              schedule: schedule,
              isOn: isOn,
              device_id: device_id,
              value: value
            });

          case 3:
            result = _context2.sent;
            result = result.toObject();
            delete result.__v;
            return _context2.abrupt("return", result);

          case 7:
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

scheduleSchema.statics.deleteSchedule = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.findByIdAndDelete(id);

          case 2:
            result = _context3.sent;
            delete result.__v;
            return _context3.abrupt("return", result);

          case 5:
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

var scheduleModel = _mongoose["default"].model("Schedules", scheduleSchema);

var _default = scheduleModel;
exports["default"] = _default;