import { Hono } from "hono";
import { useCors } from "./middlewares/corsMiddleware.js";
import { useRoutes } from "./routes/routes.js";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/");
export const runtime = 'nodejs'

useCors(app);
useRoutes(app);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
