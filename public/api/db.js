// Connects to MongoDB once and reuses the connection between requests.
import { MongoClient } from "mongodb";

const state = (globalThis.__noorMongo ??= { promise: null, indexed: false });

export async function orders() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");
  if (!state.promise) {
    state.promise = new MongoClient(process.env.MONGODB_URI).connect().catch((err) => {
      state.promise = null; // try again on the next request
      throw err;
    });
  }
  const client = await state.promise;
  const col = client.db("noorstore").collection("orders");
  if (!state.indexed) {
    await col.createIndex({ code: 1 }, { unique: true });
    await col.createIndex({ createdAt: -1 });
    state.indexed = true;
  }
  return col;
}