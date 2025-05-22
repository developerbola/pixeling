import { Hono } from "hono";
import { handle } from "hono/vercel";
import "dotenv/config.js";

import { useCors } from "../src/middlewares/corsMiddleware.js";
import { useRoutes } from "../src/routes/useRoutes.js";


const app = new Hono();

useCors(app);
useRoutes(app);

const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

export default app