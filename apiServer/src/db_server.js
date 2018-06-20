const cors = require('cors');
const fastify = require('fastify')();

// const moment = require('moment');

const port = 1956;
const autoIncreement = require('mongodb-autoincrement');
const { MongoClient } = require('mongodb');
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'NowOrder';
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

fastify.register(require('./orders'), (err) => {
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

fastify.post('/api/Orders/finish/', (req, reply) => {
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
// --------------------------///

fastify.post('/api/Orders/:id', (req, reply) => {
  const OrderId = parseInt(req.params.id);
  const Name = req.body.Name;
  const DishName = req.body.DishName;
  const unit = req.body.unit;
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('orders');
    if (err) return console.log(err);
    collection.find({ OrderId, 'MenuList.DishName': DishName }).toArray((err, docs) => {
      if (err) return console.log(err);
      if (docs.length <= 0) {
        collection.findOneAndUpdate({ OrderId }, {
          $push: {
            MenuList: {
              DishName,
              List: [{
                Name,
                unit,
              }],
            },
          },
        });
        reply.send(`Add OrderId : ${OrderId}`);
        console.log(`Add OrderId : ${OrderId}`);
        client.close();
      } else {
        collection.findOne({ OrderId }, { MenuList: 1 }, (err, docs) => {
          if (err) return console.log(err);
          const menuList = docs.MenuList;
          const name = DishName;
          const menu = menuList.find(list => list.DishName === name);
          menu.List.push({ Name, unit });
          collection.update({ OrderId, 'MenuList.DishName': DishName }, { $set: { 'MenuList.$.List': menu.List } });
          console.log(`Add OrderId : ${OrderId}`);
          reply.send(`Add OrderId : ${OrderId}`);
          client.close();
        });
      }
    });
  });
});

fastify.post('/api/Orders/dishdel/:id', (req, reply) => {
  const OrderId = parseInt(req.params.id, 10);
  const Name = req.body.Name;
  const DishName = req.body.DishName;
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('orders');
    if (err) return console.log(err);
    collection.update({ OrderId, 'MenuList.DishName': DishName }, { $pull: { 'MenuList.$.List': { Name } } });
    console.log(`Delete ${Name} from OrderId : ${OrderId}`);
    reply.send(`Delete ${Name} from OrderId : ${OrderId}`);
    client.close();
  });
});

fastify.listen(port, 'localhost', (err) => {
  if (err) throw err;
  console.log(`Api server Runing on ${port}`);
});

