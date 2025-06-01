import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { useRoutes } from "../src/routes/useRoutes.js";
import { cors } from "hono/cors";

// Initialize app and apply middlewares
const app = new Hono().basePath("/api");

// Middlewares
app.use("/api/*", cors("https://pixeling.vercel.app"));
app.use("/api/*", cors("http://pixeling.vercel.app"));
// Use hooks
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
