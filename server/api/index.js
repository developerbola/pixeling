const dotenv = require("dotenv");
dotenv.config();

const { Hono } = require("hono");
const { handle } = require("hono/vercel");
const { useCors } = require("../src/middlewares/corsMiddleware.js");
const { useRoutes } = require("../src/routes/useRoutes.js");

// Initialize app and apply middlewares
const app = new Hono();
useCors(app);
useRoutes(app);

// Test routes
app.get("/", (c) => {
  return c.json({ message: "Pixeling API is working!" });
});

app.get("/test", (c) => {
  return c.json({ message: "Test endpoint is working!" });
});

// Catch-all route
app.all("*", (c) => {
  return c.json({
    message: "Route not found",
    path: c.req.path,
    method: c.req.method,
  });
});

// Export the Vercel handler and HTTP method handlers
module.exports = {
  default: handle(app),
  GET: handle(app),
  POST: handle(app),
  PUT: handle(app),
  DELETE: handle(app),
  PATCH: handle(app),
  OPTIONS: handle(app),
};
