import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { useCors } from "../src/middlewares/corsMiddleware.js";
import { useRoutes } from "../src/routes/useRoutes.js";

// Initialize app and apply middlewares
const app = new Hono().basePath("/api");

// Use hooks
useCors(app);
useRoutes(app);

app.get("/", (c) => {
  c.json({ message: "Pixeling server is working" }, 200);
});

// Export the Vercel handler and HTTP method handlers
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;