import { MongoClient, type Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "vakmithra";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Returns a cached MongoDB database connection.
 * Creates a new connection on first call, reuses it on subsequent calls.
 */
export async function getDatabase(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(MONGODB_DB_NAME);

  console.log(`✅ Connected to MongoDB database: ${MONGODB_DB_NAME}`);
  return db;
}

/**
 * Gracefully closes the MongoDB connection.
 */
export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("🔌 MongoDB connection closed");
  }
}
