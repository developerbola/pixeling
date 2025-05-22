const { cors } = require("hono/cors");

const useCors = (app) => {
  app.use("*", cors());
};

module.exports = { useCors };
