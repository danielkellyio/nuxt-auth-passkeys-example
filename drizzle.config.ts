import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dialect: process.env.TURSO_CONNECTION_URL ? "turso" : "sqlite",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL || "file:.data/db.sqlite",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  },
});
