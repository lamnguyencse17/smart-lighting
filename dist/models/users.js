"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.userSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Users = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var userSchema = new Users({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  areas: [{
    type: ObjectId,
    ref: "Areas"
  }],
  devices: [{
    type: ObjectId,
    ref: "Devices"
  }],
  sensors: [{
    type: ObjectId,
    ref: "Sensors"
  }],
  schedules: [{
    type: ObjectId,
    ref: "Schedules"
  }]
});
exports.userSchema = userSchema;

userSchema.statics.readUserById = /*#__PURE__*/function () {
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
            //remove the useless __v
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

userSchema.statics.readUserByEmail = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var email,
      result,
      _args2 = arguments;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "test@gmail.com";
          _context2.next = 3;
          return this.findOne({
            email: email
          }).populate({
            path: "areas",
            select: "name _id",
            option: {
              lean: true
            }
          }).populate({
            path: "devices",
            select: "name _id",
            option: {
              lean: true
            }
          }).populate({
            path: "sensors",
            select: "name _id",
            option: {
              lean: true
            }
          }).lean();

        case 3:
          result = _context2.sent;
          delete result.__v;
          return _context2.abrupt("return", result);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

userSchema.statics.createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userDetails) {
    var name, email, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = userDetails.name, email = userDetails.email;
            _context3.next = 3;
            return this.create({
              name: name,
              email: email
            });

          case 3:
            result = _context3.sent;
            result = result.toObject();
            delete result.areas;
            delete result.devices;
            delete result.sensors;
            delete result.schedules;
            delete result.__v;
            return _context3.abrupt("return", result);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();

userSchema.statics.deleteUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.findByIdAndDelete(id);

          case 2:
            result = _context4.sent;
            delete result.__v;
            return _context4.abrupt("return", result);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var userModel = _mongoose["default"].model("Users", userSchema);

var _default = userModel;
exports["default"] = _default;