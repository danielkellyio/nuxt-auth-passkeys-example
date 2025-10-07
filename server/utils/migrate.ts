import { migrate } from "drizzle-orm/libsql/migrator";
import { mkdirSync } from "fs";
import { useDB } from "../database";

/**
 * Run database migrations
 * This is called automatically when the server starts
 */
export async function runMigrations() {
  try {
    // Ensure the .data directory exists
    mkdirSync(".data", { recursive: true });
    const db = useDB();

    // Run migrations
    await migrate(db, {
      migrationsFolder: "./server/database/migrations",
    });

    console.log("✅ Database migrations completed");
  } catch (error) {
    console.error("❌ Database migration failed:", error);
  }
}
