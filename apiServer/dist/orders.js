'use strict';

var _query = require('./query');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (fastify, option, next) {
  fastify.get('/api/Orders/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, reply) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _query.getOrders)();

            case 2:
              data = _context.sent;

              reply.send(data);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  fastify.get('/api/Orders/:id', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, reply) {
      var id, orderId, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              orderId = id;
              _context2.next = 4;
              return (0, _query.getOrderByid)(orderId);

            case 4:
              data = _context2.sent;

              reply.send(data);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  fastify.post('/api/Orders/', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, reply) {
      var _req$body, RestaurantName, RestaurantUrl, Creator, data;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, RestaurantName = _req$body.RestaurantName, RestaurantUrl = _req$body.RestaurantUrl, Creator = _req$body.Creator;
              _context3.next = 3;
              return (0, _query.createOrder)(RestaurantName, RestaurantUrl, Creator);

            case 3:
              data = _context3.sent;

              reply.send(data);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  fastify.patch('/api/Orders/', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, reply) {
      var _req$body2, RestaurantName, RestaurantUrl, OrderId, data;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, RestaurantName = _req$body2.RestaurantName, RestaurantUrl = _req$body2.RestaurantUrl, OrderId = _req$body2.OrderId;
              _context4.next = 3;
              return (0, _query.editOrder)(RestaurantName, RestaurantUrl, OrderId);

            case 3:
              data = _context4.sent;

              reply.send(data);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  fastify.delete('/api/order/delete/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, reply) {
      var id, data;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.next = 3;
              return (0, _query.deleteOrder)(id);

            case 3:
              data = _context5.sent;

              reply.send(data);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  next();
};
//# sourceMappingURL=orders.js.map