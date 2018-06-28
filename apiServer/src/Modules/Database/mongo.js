import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:123456@127.0.0.1:27019'
const connectDB = async () => {
  try {
    const db = await MongoClient.connect(uri);
    return db;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { connectDB };
