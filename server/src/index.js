import { Hono } from "hono";
import { useCors } from "./middlewares/corsMiddleware.js";
import { registerUploadRoutes } from "./routes/uploadRoute.js";

const app = new Hono();

useCors(app);
registerUploadRoutes(app);

export default {
  port: 8787,
  fetch: app.fetch,
};
