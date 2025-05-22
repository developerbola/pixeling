const { Hono } = require("hono");
const { handle } = require("hono/vercel");
require("dotenv/config.js");

const { useCors } = require("../src/middlewares/corsMiddleware.js");
const { useRoutes } = require("../src/routes/useRoutes.js");

const app = new Hono();

useCors(app);
useRoutes(app);

const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

export default app;
