/**
 * Server plugin to run database migrations on startup
 */
export default defineNitroPlugin(async () => {
  if (process.env.NODE_ENV === "development") {
    const { runMigrations } = await import("../utils/migrate");
    await runMigrations();
  }
});
