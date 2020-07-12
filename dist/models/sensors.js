"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sensorSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var Sensors = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var sensorSchema = new Sensors({
  name: {
    type: String,
    required: true
  },
  device_id: {
    type: String,
    required: true
  },
  readings: [{
    date: {
      type: Date,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  conditions: [{
    type: ObjectId,
    ref: "Conditions"
  }]
});
exports.sensorSchema = sensorSchema;

sensorSchema.statics.readSensorById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            }, {
              readings: {
                $slice: -5
              }
            }).populate({
              path: "conditions",
              select: "comparison isOn value sensorValue area device",
              populate: {
                path: "device",
                select: "device_id -_id name",
                option: {
                  lean: true
                }
              },
              option: {
                lean: true
              }
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

sensorSchema.statics.getConditionsByDeviceId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.findOne({
              device_id: id
            }).populate({
              path: "conditions",
              select: "comparison isOn value sensorValue area device",
              populate: {
                path: "device",
                select: "device_id -_id",
                option: {
                  lean: true
                }
              },
              option: {
                lean: true
              }
            }).select("conditions");

          case 2:
            result = _context2.sent;
            delete result.__v;
            return _context2.abrupt("return", result);

          case 5:
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

sensorSchema.statics.createSensor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(sensorDetails) {
    var name, device_id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = sensorDetails.name, device_id = sensorDetails.device_id;
            _context3.next = 3;
            return this.create({
              name: name,
              device_id: device_id
            });

          case 3:
            result = _context3.sent;
            result = result.toObject();
            delete result.__v;
            return _context3.abrupt("return", result);

          case 7:
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

sensorSchema.statics.updateSensor = function (sensorDetails) {
  var device_id = sensorDetails.device_id,
      value = sensorDetails.value;
  console.log({
    device_id: device_id,
    value: value
  });
  var now = (0, _moment["default"])().toString(); // get local time

  var result = this.findOneAndUpdate({
    device_id: device_id
  }, {
    $push: {
      readings: {
        date: now,
        value: value
      }
    }
  }, {
    "new": true,
    upsert: true
  }).exec();
};

sensorSchema.statics.addCondition = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(sensorId, conditionId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.updateOne({
              _id: _mongoose["default"].Types.ObjectId(sensorId)
            }, {
              $push: {
                conditions: conditionId
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

sensorSchema.statics.removeCondition = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(sensorId, conditionId) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return this.findOneAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(sensorId)
            }, {
              $pull: {
                'conditions': _mongoose["default"].Types.ObjectId(conditionId)
              }
            });

          case 2:
            result = _context5.sent;
            delete result.__v;
            return _context5.abrupt("return", result);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

sensorSchema.statics.getReadingsByDuration = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, duration) {
    var result, returnArray;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return this.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 2:
            result = _context6.sent;
            returnArray = result.readings.filter(function (reading) {
              var d = new Date(reading.date);
              var time = parseInt((Date.now() - d.getTime()) / 1000);

              switch (duration) {
                case 0:
                  return time <= 86400;

                case 1:
                  return 86400 < time && time <= 259200;

                case 2:
                  return 172800 < time && time <= 432000;
              }
            });
            return _context6.abrupt("return", returnArray);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

sensorSchema.statics.deleteSensor = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return this.findByIdAndDelete(id);

          case 2:
            result = _context7.sent;
            delete result.__v;
            return _context7.abrupt("return", result);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var sensorModel = _mongoose["default"].model("Sensors", sensorSchema);

var _default = sensorModel;
exports["default"] = _default;