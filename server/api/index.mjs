import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import getImages from "../src/controllers/get-images.contoller.js";
import singleImageController from "../src/controllers/single-image.controller.js";
import uploadController from "../src/controllers/upload.controller.js";
import authController from "../src/controllers/auth.controller.js";

const app = new Hono().basePath("/api");

// Middleware: apply CORS
app.use(
  "*",
  cors({
    origin: ["https://pixeling.vercel.app", "http://localhost:3001"],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Authorization",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  })
);

// Routes
app.get("/images", getImages);
app.post("/image/:uuid", singleImageController);
app.post("/upload", uploadController);
app.post("/protected", authController);

// Home route
app.get("/", (c) => c.json({ message: "Pixeling backend is working!" }));

// Catch-all
app.all("*", (c) =>
  c.json({
    message: "Route not found",
    path: c.req.path,
    method: c.req.method,
  })
);

// Export the Vercel handler and HTTP method handlers
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;
