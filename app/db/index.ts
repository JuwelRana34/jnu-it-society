// app/db/index.ts
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema"; // আপনার schema ফাইল

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  // async: true দিয়ে context নিন (dev mode-এ timing fix করে)
  const ctx = await getCloudflareContext({ async: true });

  if (!ctx?.env?.DB) {
    throw new Error("Cloudflare D1 binding 'DB' not found. Check wrangler.toml");
  }

  dbInstance = drizzle(ctx.env.DB, { schema });
  return dbInstance;
}