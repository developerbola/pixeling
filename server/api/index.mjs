import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors as corsHono } from "hono/cors";
import { cors } from "cors";
import {
  getImages,
  singleImageController,
  uploadController,
} from "../src/controllers/controllers.js";

// Initialize app and apply middlewares
const app = new Hono().basePath("/api");

// Middlewares
app.use("*", corsHono());
app.use("*", cors());

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

export default handle(app);
