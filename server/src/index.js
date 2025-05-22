import { Hono } from "hono";
import { useCors } from "./middlewares/corsMiddleware.js";
import { useRoutes } from "./routes/routes.js";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

useCors(app);
useRoutes(app);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
