// app/api/auth/[...all]/route.ts
import { toNextJsHandler } from "better-auth/next-js";
import { createAuthInstance } from "@/lib/auth";

// lazy init
let authHandler: ReturnType<typeof toNextJsHandler>;

async function getAuthHandler() {
  if (!authHandler) {
    const auth = await createAuthInstance();
    authHandler = toNextJsHandler(auth.handler);
  }
  return authHandler;
}

export async function GET(request: Request) {
  const handler = await getAuthHandler();
  return handler.GET(request);
}

export async function POST(request: Request) {
  const handler = await getAuthHandler();
  return handler.POST(request);
}

// অন্যান্য methods যদি থাকে (PUT, DELETE ইত্যাদি) একইভাবে