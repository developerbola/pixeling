import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import {
  getImages,
  singleImageController,
  uploadController,
} from "../src/controllers/controllers";

// Initialize app and apply middlewares
const app = new Hono().basePath("/api");

// Middlewares
app.use(
  "*",
  cors({
    origin: "https://pixeling.vercel.app",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  })
);

// Use routes
app.get("/images", getImages);
app.post("/image/:uuid", singleImageController);
app.post("/upload", uploadController);

// Home route
app.get("/", (c) => {
  return c.json({ message: "Pixeling backend is working!" });
});

// Catch-all route
app.all("*", (c) => {
  return c.json({
    message: "Route not found",
    path: c.req.path,
    method: c.req.method,
  });
});

// Export the Vercel handler and HTTP method handlers
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;
