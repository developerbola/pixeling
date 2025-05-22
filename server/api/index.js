import { Hono } from "hono";
import { useCors } from "../src/middlewares/corsMiddleware.js";
import { handle } from "hono/vercel";
import { getImages } from "../src/controllers/get-images.contoller.js";
import { uploadController } from "../src/controllers/upload.controller.js";

const app = new Hono()

useCors(app);

app.get("/images", getImages);
app.post("/upload", uploadController);

// Test route
app.get("/test", (c) => {
  return c.json({ message: "Test route working!" });
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
