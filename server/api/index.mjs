import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { handle } from "hono/vercel";
// hooks
import { useRoutes } from "../src/routes/useRoutes.js";
import { useCors } from "../src/cors/useCors.js";

const app = new Hono().basePath("/api");

// apply CORS
useCors(app)
// apply Routes
useRoutes(app)

// Export the Vercel handler and HTTP method handlers
const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;

export default app