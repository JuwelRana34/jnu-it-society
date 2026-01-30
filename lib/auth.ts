// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "@/app/db"; // আপনার async getDB

export async function createAuthInstance() {
  const db = await getDB();

  return betterAuth({
    // Database adapter (Drizzle + D1 / SQLite compatible)
    database: drizzleAdapter(db, {
      provider: "sqlite", // D1 হলে "sqlite" ব্যবহার করুন (PostgreSQL হলে "pg")
      // যদি আপনার schema কাস্টম হয়, তাহলে অ্যাড করুন:
      // schema: yourSchema, // optional
      // usePlural: true, // table names plural করতে চাইলে
    }),

    // Email & Password enable করা
    emailAndPassword: {
      enabled: true, // ← এটা দিলেই email/password চালু

      // অপশনাল: অতিরিক্ত কনফিগ (যদি চান)
      // requireEmailVerification: true, // ইমেইল ভেরিফিকেশন বাধ্যতামূলক করতে
      // minPasswordLength: 8, // পাসওয়ার্ডের মিনিমাম লেন্থ
      // maxPasswordLength: 128,
      // passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, // কাস্টম পাসওয়ার্ড strength regex
    },

    // Secret (অবশ্যই .env.local / wrangler.toml-এ BETTER_AUTH_SECRET রাখুন)
    secret: process.env.BETTER_AUTH_SECRET!,

    // অপশনাল: Base URL (production-এ domain দিন)
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

    // যদি social providers (Google/GitHub) যোগ করতে চান, এখানে অ্যাড করুন
    // socialProviders: {
    //   google: { clientId: "...", clientSecret: "..." },
    // },

    // অন্যান্য কনফিগ যদি দরকার হয়
    // session: { strategy: "jwt" }, // default jwt
    // advanced: { generateId: ... },
  });
}