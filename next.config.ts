// next.config.ts
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

console.log("🚀 initOpenNextCloudflareForDev CALLED SUCCESSFULLY");

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // আপনার config এখানে
};

export default nextConfig;