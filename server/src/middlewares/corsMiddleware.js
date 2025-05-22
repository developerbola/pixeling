const { cors } = require("hono/cors");

export const useCors = (app) => {
  app.use("*", cors());
};
