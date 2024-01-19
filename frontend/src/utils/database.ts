// External Dependencies
import { MongoClient } from 'mongodb';

// Global Variables
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = new MongoClient(process.env.DB_CONN_STRING ?? '').connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(process.env.DB_CONN_STRING ?? '').connect();
}

export { connectDB };
