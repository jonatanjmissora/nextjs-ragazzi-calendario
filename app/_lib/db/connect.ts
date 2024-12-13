
import { MongoClient } from "mongodb"

let client: MongoClient
let clientPromise: Promise<MongoClient>
const URI = process.env.MONGODB_URI
const DB = process.env.MONGO_DB
const options = {}

if (!URI) {
  throw new Error("Please add your MongoDB URI to the .env file")
}

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the MongoClient instance is not recreated.
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(URI, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise

  
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(URI, options)
  clientPromise = client.connect()
}

async function getDatabase() {
  const client = await clientPromise
  return client.db(DB)
}

export async function getCollection(collectionName: string) {
  const db = await getDatabase()
  return db.collection(collectionName)
}

export default getDatabase



/*
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
}

export async function getDatabase() {
  const mongoClient = await client.connect();
  return mongoClient.db("Ragazzi")
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;
*/