import type { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }
}
