import { connectDB } from './mongo';
import autoincrement from 'mongodb-autoincrement';

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
    const autoindex = await () => new Promise((resolve, reject) => {
      autoincrement.getNextSequence(db, colName, (err, autoIndex) => {
        if (err) reject(err);
        resolve(autoIndex);
      });
    });
    const OrderId = await autoindex();





    const result = await col.insert()
  } catch (error) {
    console.log(error.stack);
  }
};

createOrder(1, 1, 1);

export { getOrders, getOrderByid, createOrder };
