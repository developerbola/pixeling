const { cors } = require("hono/cors");

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === "production" ? "https://pixeling.vercel.app" : "http://localhost:3001";

const useCors = (app) => {
  app.use(
    "*",
    cors({
      origin: ALLOWED_ORIGIN,
      allowMethods: ["*"],
      allowHeaders: ["*"],
    })
  );
};

module.exports = { useCors };
