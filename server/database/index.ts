import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

/**
 * Database connection instance
 * Using libsql for local development (also compatible with Turso for production)
 */
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL || "file:.data/db.sqlite",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const db = drizzle(client, { schema });

export const useDB = () => db;
