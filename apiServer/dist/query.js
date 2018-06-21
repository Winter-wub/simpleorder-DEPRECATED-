'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOrder = exports.editOrder = exports.createOrder = exports.getOrderByid = exports.getOrders = undefined;

var _mongodbAutoincrement = require('mongodb-autoincrement');

var _mongodbAutoincrement2 = _interopRequireDefault(_mongodbAutoincrement);

var _mongo = require('./mongo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dbName = 'NowOrder';
var colName = 'orders';

var getOrders = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var client, db, col, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongo.connectDB)();

          case 2:
            client = _context.sent;
            db = client.db(dbName);
            col = db.collection(colName);
            _context.next = 7;
            return col.find({}).sort({ _id: -1 }).toArray();

          case 7:
            result = _context.sent;

            client.close();
            return _context.abrupt('return', result);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getOrders() {
    return _ref.apply(this, arguments);
  };
}();

var getOrderByid = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(Id) {
    var orderId, client, db, col, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            orderId = parseInt(Id, 10);
            _context2.next = 3;
            return (0, _mongo.connectDB)();

          case 3:
            client = _context2.sent;
            db = client.db(dbName);
            col = db.collection(colName);
            _context2.prev = 6;
            _context2.next = 9;
            return col.find({ OrderId: orderId }).toArray();

          case 9:
            result = _context2.sent;

            client.close();
            return _context2.abrupt('return', result);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](6);

            console.log(_context2.t0);
            return _context2.abrupt('return', _context2.t0);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[6, 14]]);
  }));

  return function getOrderByid(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var createOrder = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resName, resUrl, creator) {
    var client, db, col, autoindex, genId, insertData, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _mongo.connectDB)();

          case 2:
            client = _context3.sent;
            db = client.db(dbName);
            col = db.collection(colName);
            _context3.prev = 5;

            autoindex = function autoindex() {
              return new Promise(function (resolve, reject) {
                _mongodbAutoincrement2.default.getNextSequence(db, colName, function (err, autoIndex) {
                  if (err) reject(err);
                  resolve(autoIndex);
                });
              });
            };

            _context3.next = 9;
            return autoindex();

          case 9:
            genId = _context3.sent;
            insertData = {
              RestaurantName: resName,
              RestaurantUrl: resUrl,
              OrderId: genId,
              Creator: creator,
              MenuList: [],
              Status: 'Pending',
              CreateDate: new Date()
            };
            _context3.next = 13;
            return col.insert(insertData);

          case 13:
            result = _context3.sent;

            client.close();
            return _context3.abrupt('return', result);

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3['catch'](5);
            return _context3.abrupt('return', console.log(_context3.t0.stack));

          case 21:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[5, 18]]);
  }));

  return function createOrder(_x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var editOrder = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resName, resUrl, id) {
    var client, db, col, updateData, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _mongo.connectDB)();

          case 2:
            client = _context4.sent;
            db = client.db(dbName);
            col = db.collection(colName);
            updateData = {
              RestaurantName: resName,
              RestaurantUrl: resUrl,
              OrderId: parseInt(id, 10)
            };
            _context4.prev = 6;
            _context4.next = 9;
            return col.update({ OrderId: updateData.OrderId }, {
              $set: {
                RestaurantName: updateData.RestaurantName,
                RestaurantUrl: updateData.Url
              }
            });

          case 9:
            result = _context4.sent;
            return _context4.abrupt('return', result);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4['catch'](6);
            return _context4.abrupt('return', console.log(_context4.t0.stack));

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[6, 13]]);
  }));

  return function editOrder(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteOrder = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(Id) {
    var OrderId, client, db, col, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            OrderId = parseInt(Id, 10);
            _context5.next = 3;
            return (0, _mongo.connectDB)();

          case 3:
            client = _context5.sent;
            db = client.db(dbName);
            col = db.collection(colName);
            _context5.prev = 6;
            result = col.remove({ OrderId: OrderId });

            client.close();
            return _context5.abrupt('return', result);

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5['catch'](6);
            return _context5.abrupt('return', console.log(_context5.t0.stack));

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[6, 12]]);
  }));

  return function deleteOrder(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getOrders = getOrders;
exports.getOrderByid = getOrderByid;
exports.createOrder = createOrder;
exports.editOrder = editOrder;
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=query.js.map