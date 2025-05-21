import { Hono } from "hono";
import { useCors } from "./src/middlewares/corsMiddleware.js";
import { useRoutes } from "./src/routes/routes.js";

const app = new Hono();

useCors(app);
useRoutes(app);

export default app.fetch;
