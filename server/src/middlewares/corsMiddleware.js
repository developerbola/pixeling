const { cors } = require("hono/cors");

const useCors = (app) => {
  app.use(
    "*",
    cors({
      origin: ["https://pixeling.vercel.app", "http://localhost:3001"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );
};

module.exports = { useCors };
