import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

/**
 * Database connection instance
 * Using libsql for local development (also compatible with Turso for production)
 */
const client = createClient({
  url: process.env.DATABASE_URL || "file:.data/db.sqlite",
});

const db = drizzle(client, { schema });

export const useDB = () => db;
