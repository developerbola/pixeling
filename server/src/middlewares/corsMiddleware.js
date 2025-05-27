const { cors } = require("hono/cors");

const useCors = (app) => {
  app.use(
    "*",
    cors({
      origin: "https://pixeling.vercel.app",
      allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );
};

module.exports = { useCors };
