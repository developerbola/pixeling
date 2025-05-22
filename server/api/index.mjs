import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
// import { useCors } from "../src/middlewares/corsMiddleware.js";
// import { useRoutes } from "../src/routes/useRoutes.js";

// Initialize app and apply middlewares
const app = new Hono();
// useCors(app);
// useRoutes(app);
app.get("/", (c) => {
  c.json({ message: "hello" });
});

// Export the Vercel handler and HTTP method handlers
export default handle(app);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);
