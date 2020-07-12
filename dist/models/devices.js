"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deviceSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Devices = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var deviceSchema = new Devices({
  name: {
    type: String,
    required: true
  },
  device_id: {
    type: String,
    required: true
  },
  history: [{
    date: {
      type: Date,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    isOn: {
      type: Boolean,
      required: true
    }
  }],
  conditions: {
    type: ObjectId,
    ref: "Conditions"
  }
});
exports.deviceSchema = deviceSchema;

deviceSchema.statics.readDeviceById = /*#__PURE__*/function () {
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

deviceSchema.statics.updateToDeviceId = function (device_id, value, isOn) {
  var result = this.findOneAndUpdate({
    device_id: device_id
  }, {
    $push: {
      history: {
        date: Date.now(),
        value: value,
        isOn: isOn
      }
    }
  }, {
    "new": true
  });
  return result;
};

deviceSchema.statics.createDevice = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(deviceDetails) {
    var name, device_id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = deviceDetails.name, device_id = deviceDetails.device_id;
            _context2.next = 3;
            return this.create({
              name: name,
              device_id: device_id
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

deviceSchema.statics.deleteDevice = /*#__PURE__*/function () {
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

deviceSchema.statics.addCondition = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(deviceId, conditionId) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.updateOne({
              _id: _mongoose["default"].Types.ObjectId(deviceId)
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

deviceSchema.statics.removeCondition = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(deviceId, conditionId) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return this.findOneAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(deviceId)
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

var deviceModel = _mongoose["default"].model("Devices", deviceSchema);

var _default = deviceModel;
exports["default"] = _default;