import { cors } from "hono/cors";

export const useCors = (app) => {
  app.use("*", cors());
};
