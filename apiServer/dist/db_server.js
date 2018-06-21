'use strict';

var cors = require('cors');
var fastify = require('fastify')();

// const moment = require('moment');

var port = 1956;
var autoIncreement = require('mongodb-autoincrement');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017';
// Database Name
var dbName = 'NowOrder';
fastify.use(cors());

/* fastify.get('/api/Orders/', (req, reply) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('orders');
    collection.find({}).sort({ _id: -1 }).toArray((err, docs) => {
      assert.equal(err, null);
      if (err) return reply.send(err);
      reply.send(docs);
      client.close();
    });
  });
}); */

fastify.register(require('./orders'), function (err) {
  if (err) console.log(err);
});

// fastify.get('/api/Orders/:id', (req, reply) => {
//   const OrderId = parseInt(req.params.id, 10);
//   MongoClient.connect(url, (err, client) => {
//     const db = client.db(dbName);
//     const collection = db.collection('orders');
//     collection.find({ OrderId }).toArray((err, docs) => {
//       assert.equal(err, null);
//       if (err) return reply.send(err);
//       reply.send(docs);
//       client.close();
//     });
//   });
// });


// fastify.post('/api/Orders/', (req, reply) => {
//   const RestaurantName = req.body.RestaurantName;
//   const RestaurantUrl = req.body.RestaurantUrl;
//   const Creator = req.body.Creator;
//   MongoClient.connect(url, (err, client) => {
//     const db = client.db(dbName);
//     const collection = db.collection('orders');
//     autoIncreement.getNextSequence(db, 'orders', (err, autoIndex) => {
//       collection.insert({
//         OrderId: autoIndex,
//         RestaurantName,
//         RestaurantUrl,
//         Creator,
//         CreateDate: new Date(),
//         MenuList: [],
//         Status: 'Pending',
//       }, (err, doc) => {
//         if (err) return reply.send(err);
//         client.close();
//         console.log(`Created OrderId : ${autoIndex}`);
//         reply.send(`Created OrderId : ${autoIndex}`);
//       });
//     });
//   });
// });

// fastify.patch('/api/Orders/', (req, reply) => {
//   const RestaurantName = req.body.RestaurantName;
//   const RestaurantUrl = req.body.RestaurantUrl;
//   const OrderId = req.body.OrderId;
//   MongoClient.connect(url, (err, client) => {
//     const db = client.db(dbName);
//     const collection = db.collection('orders');
//     collection.update({
//       OrderId,
//     }, {
//       $set: {
//         RestaurantName,
//         RestaurantUrl,
//       },

//     }, (err, result) => {
//       if (err) return console.log(err);
//       reply.send(result);
//       client.close();
//       console.log(`Update OrderId${OrderId}`);
//     });
//   });
// });

// fastify.delete('/api/order/delete/:id', (req, reply) => {
//   const OrderId = parseInt(req.params.id, 10);
//   // console.log(OrderId)
//   MongoClient.connect(url, (err, client) => {
//     if (err) return console.log(err);
//     const db = client.db(dbName);
//     const collection = db.collection('orders');
//     collection.remove({ OrderId }, (err, result) => {
//       if (err) return console.log(err);
//       reply.send(`Delete OrderId : ${OrderId}`);
//       client.close();
//       console.log(`${result.result}Delete OrderId${OrderId}`);
//     });
//   });
// });

fastify.post('/api/Orders/finish/', function (req, reply) {
  var OrderId = parseInt(req.body.OrderId, 10);

  MongoClient.connect(url, function (err, client) {
    var db = client.db(dbName);
    var collection = db.collection('orders');
    collection.update({ OrderId: OrderId }, {
      $set: {
        Status: 'Ordered'
      }
    }, function (err, result) {
      if (err) return console.log(err);
      reply.send('Ordered OrderId : ' + OrderId);
      client.close();
      console.log(result.result, 'Ordered OrderId : ' + OrderId);
    });
  });
});
// --------------------------///

fastify.post('/api/Orders/:id', function (req, reply) {
  var OrderId = parseInt(req.params.id);
  var Name = req.body.Name;
  var DishName = req.body.DishName;
  var unit = req.body.unit;
  MongoClient.connect(url, function (err, client) {
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
  MongoClient.connect(url, function (err, client) {
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
  console.log('Api server Runing on ' + port);
});
//# sourceMappingURL=db_server.js.map