import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const connectDB = async () => {
  try {
    const db = await MongoClient.connect(uri);
    return db;
  } catch (error) {
    return console.log(error);
  }
};
module.exports = { connectDB };
