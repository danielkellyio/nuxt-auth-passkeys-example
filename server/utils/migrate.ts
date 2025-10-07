import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { mkdirSync } from "fs";

/**
 * Run database migrations
 * This is called automatically when the server starts
 */
export function runMigrations() {
  try {
    // Ensure the .data directory exists
    mkdirSync(".data", { recursive: true });

    const client = createClient({
      url: process.env.DATABASE_URL || "file:.data/db.sqlite",
    });
    const db = drizzle(client);

    // Run migrations
    migrate(db, { migrationsFolder: "./server/database/migrations" });

    console.log("✅ Database migrations completed");
  } catch (error) {
    console.error("❌ Database migration failed:", error);
  }
}
