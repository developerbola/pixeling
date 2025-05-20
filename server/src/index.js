import { Hono } from "hono";
import { useCors } from "./middlewares/corsMiddleware.js";
import { useRoutes } from "./routes/routes.js";

const app = new Hono();

useCors(app);
useRoutes(app);

export default {
  port: 8787,
  fetch: app.fetch,
};
