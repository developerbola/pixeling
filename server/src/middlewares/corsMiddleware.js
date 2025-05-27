const { cors } = require("hono/cors");

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === "production" ? "https://pixeling.vercel.app" : "*";

const useCors = (app) => {
  app.use(
    "/api/*",
    cors({
      origin: ALLOWED_ORIGIN,
      allowMethods: ["*"],
      allowHeaders: ["*"],
    })
  );
};

module.exports = { useCors };
