import { Hono } from "hono";
import { useCors } from "../src/middlewares/corsMiddleware.js";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

// Add CORS middleware
useCors(app);

app.get("/", (c) => {
  return c.json({ message: "Hello from Hono on Vercel!" });
});

app.get("/test", (c) => {
  return c.json({ message: "Test route working!" });
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;