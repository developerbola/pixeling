import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import {
  getImages,
  singleImageController,
  uploadController,
} from "../src/controllers/controllers.js";

const app = new Hono().basePath("/api");

// Middleware: apply CORS
app.use(
  "*",
  cors({
    origin: "https://pixeling.vercel.app",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  })
);

// Routes
app.get("/images", getImages);
app.post("/image/:uuid", singleImageController);
app.post("/upload", uploadController);

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

export default handle(app);
