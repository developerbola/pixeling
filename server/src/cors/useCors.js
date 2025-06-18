import { cors } from "hono/cors";

export const useCors = (app) => {
  app.use(
    "*",
    cors({
      origin: ["https://pixeling.vercel.app", "http://localhost:3001"],
      allowHeaders: [
        "Content-Type",
        "X-Custom-Header",
        "Upgrade-Insecure-Requests",
        "Authorization",
        "Origin",
      ],
      allowMethods: ["POST", "GET", "DELETE˝", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      credentials: "include",
    })
  );
};
