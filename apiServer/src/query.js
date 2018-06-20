import autoincrement from 'mongodb-autoincrement';
import { connectDB } from './mongo';

const dbName = 'NowOrder';
const colName = 'orders';

const getOrders = async () => {
  const client = await connectDB();
  const db = client.db(dbName);
  const col = db.collection(colName);
  const result = await col.find({}).sort({ _id: -1 }).toArray();
  client.close();
  return result;
};

const getOrderByid = async (Id) => {
  const orderId = parseInt(Id, 10);
  const client = await connectDB();
  const db = client.db(dbName);
  const col = db.collection(colName);
  try {
    const result = await col.find({ OrderId: orderId }).toArray();
    client.close();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrder = async (resName, resUrl, creator) => {
  const client = await connectDB();
  const db = client.db(dbName);
  const col = db.collection(colName);
  try {
    const autoindex = () => new Promise((resolve, reject) => {
      autoincrement.getNextSequence(db, colName, (err, autoIndex) => {
        if (err) reject(err);
        resolve(autoIndex);
      });
    });
    const genId = await autoindex();
    const insertData = {
      RestaurantName: resName,
      RestaurantUrl: resUrl,
      OrderId: genId,
      Creator: creator,
      MenuList: [],
      Status: 'Pending',
      CreateDate: new Date(),
    };
    const result = await col.insert(insertData);
    client.close();
    return result;
  } catch (error) {
    return console.log(error.stack);
  }
};

const editOrder = async (resName, resUrl, id) => {
  const client = await connectDB();
  const db = client.db(dbName);
  const col = db.collection(colName);
  const updateData = {
    RestaurantName: resName,
    RestaurantUrl: resUrl,
    OrderId: parseInt(id, 10),
  };
  try {
    const result = await col.update({ OrderId: updateData.OrderId }, {
      $set: {
        RestaurantName: updateData.RestaurantName,
        RestaurantUrl: updateData.Url,
      },
    });
    return result;
  } catch (error) {
    return console.log(error.stack);
  }
};

const deleteOrder = async (Id) => {
  const OrderId = parseInt(Id, 10);
  const client = await connectDB();
  const db = client.db(dbName);
  const col = db.collection(colName);
  try {
    const result = col.remove({ OrderId });
    client.close();
    return result;
  } catch (error) {
    return console.log(error.stack);
  }
};

export {
  getOrders,
  getOrderByid,
  createOrder,
  editOrder,
  deleteOrder,
};
