"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopAgenda = exports.cancelAgenda = exports.setAgenda = exports.startAgenda = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _agenda = _interopRequireDefault(require("agenda"));

var _schedules = _interopRequireDefault(require("../models/schedules"));

var _mqtt = require("./mqtt");

var _devices = _interopRequireDefault(require("../models/devices"));

var data_uri = "mongodb+srv://tri:team2447@cluster0-wrndr.azure.mongodb.net/smart-lighting?retryWrites=true&w=majority";
var agenda;

var startAgenda = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            agenda = new _agenda["default"]({
              db: {
                address: data_uri,
                collection: "agenda"
              },
              processEvery: "10 seconds",
              maxConcurrency: 20
            });
            agenda.on("ready", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      console.log("AGENDA READY");
                      _context.next = 3;
                      return agenda.start();

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            agenda.on("fail", function (err, job) {
              console.log("Job failed with error: ".concat(err.message));
            });
            agenda.on("complete", function (job) {
              //handle done here
              // job name = _id of schedule
              console.log("Job ".concat(job.attrs.name, " finished"));
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function startAgenda() {
    return _ref.apply(this, arguments);
  };
}();

exports.startAgenda = startAgenda;

var setAgenda = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result, value, device_id, isOn, schedule;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _schedules["default"].readScheduleById(id);

          case 2:
            result = _context4.sent;
            value = result.value, device_id = result.device_id, isOn = result.isOn, schedule = result.schedule; // let time = await timeConverter(schedule);

            _context4.next = 6;
            return agenda.define(id, /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(job) {
                var values;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (isOn == true) {
                          values = [isOn ? "1" : "0", "".concat(value)];
                          (0, _mqtt.publishTo)([{
                            device_id: device_id,
                            values: values
                          }]);
                        } else {
                          (0, _mqtt.publishTo)([{
                            device_id: device_id,
                            values: ["0", "0"]
                          }]);
                        }

                        _context3.next = 3;
                        return _devices["default"].updateToDeviceId(device_id, value, isOn);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 6:
            _context4.next = 8;
            return agenda.schedule(time, id);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setAgenda(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setAgenda = setAgenda;

var cancelAgenda = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return agenda.cancel({
              name: id
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function cancelAgenda(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.cancelAgenda = cancelAgenda;

var stopAgenda = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return agenda.stop();

          case 2:
            process.exit(0);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function stopAgenda() {
    return _ref6.apply(this, arguments);
  };
}();

exports.stopAgenda = stopAgenda;