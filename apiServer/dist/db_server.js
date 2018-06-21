'use strict';

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fastify = require('fastify')();
var port = 1956;

// Connection URL
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'NowOrder';

fastify.use((0, _cors2.default)());
fastify.register(require('./Modules/Order/'), function (err) {
  if (err) console.log(err);
});

/* fastify.post('/api/Orders/finish/', (req, reply) => {
  const OrderId = parseInt(req.body.OrderId, 10);

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('orders');
    collection.update({ OrderId }, {
      $set: {
        Status: 'Ordered',
      },
    }, (err, result) => {
      if (err) return console.log(err);
      reply.send(`Ordered OrderId : ${OrderId}`);
      client.close();
      console.log(result.result, `Ordered OrderId : ${OrderId}`);
    });
  });
});
*/
// --------------------------///

fastify.post('/api/Orders/:id', function (req, reply) {
  var OrderId = parseInt(req.params.id);
  var Name = req.body.Name;
  var DishName = req.body.DishName;
  var unit = req.body.unit;
  _mongodb.MongoClient.connect(url, function (err, client) {
    var db = client.db(dbName);
    var collection = db.collection('orders');
    if (err) return console.log(err);
    collection.find({ OrderId: OrderId, 'MenuList.DishName': DishName }).toArray(function (err, docs) {
      if (err) return console.log(err);
      if (docs.length <= 0) {
        collection.findOneAndUpdate({ OrderId: OrderId }, {
          $push: {
            MenuList: {
              DishName: DishName,
              List: [{
                Name: Name,
                unit: unit
              }]
            }
          }
        });
        reply.send('Add OrderId : ' + OrderId);
        console.log('Add OrderId : ' + OrderId);
        client.close();
      } else {
        collection.findOne({ OrderId: OrderId }, { MenuList: 1 }, function (err, docs) {
          if (err) return console.log(err);
          var menuList = docs.MenuList;
          var name = DishName;
          var menu = menuList.find(function (list) {
            return list.DishName === name;
          });
          menu.List.push({ Name: Name, unit: unit });
          collection.update({ OrderId: OrderId, 'MenuList.DishName': DishName }, { $set: { 'MenuList.$.List': menu.List } });
          console.log('Add OrderId : ' + OrderId);
          reply.send('Add OrderId : ' + OrderId);
          client.close();
        });
      }
    });
  });
});

fastify.post('/api/Orders/dishdel/:id', function (req, reply) {
  var OrderId = parseInt(req.params.id, 10);
  var Name = req.body.Name;
  var DishName = req.body.DishName;
  _mongodb.MongoClient.connect(url, function (err, client) {
    var db = client.db(dbName);
    var collection = db.collection('orders');
    if (err) return console.log(err);
    collection.update({ OrderId: OrderId, 'MenuList.DishName': DishName }, { $pull: { 'MenuList.$.List': { Name: Name } } });
    console.log('Delete ' + Name + ' from OrderId : ' + OrderId);
    reply.send('Delete ' + Name + ' from OrderId : ' + OrderId);
    client.close();
  });
});

fastify.listen(port, 'localhost', function (err) {
  if (err) throw err;
  console.log('Server Runing on ' + port);
});
//# sourceMappingURL=db_server.js.map