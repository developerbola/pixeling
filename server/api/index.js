import { Hono } from "hono"
import { handle } from "hono/vercel"
import dotenv from "dotenv"
dotenv.config()

// Import your middleware and routes
import { useCors } from "../src/middlewares/corsMiddleware.js"
import { useRoutes } from "../src/routes/useRoutes.js"

// Apply middleware and routes
const useCorsHook = useCors
const useRoutesHook = useRoutes

// Create the Hono app without basePath
const app = new Hono()
useCorsHook(app)
useRoutesHook(app)

// Initialize a test route to verify deployment
app.get("/", (c) => {
  return c.json({ message: "Hono API is working!" })
})

app.get("/api", (c) => {
  return c.json({ message: "API endpoint is working!" })
})

// Add a catch-all route for debugging
app.all("*", (c) => {
  return c.json({
    message: "Route not found",
    path: c.req.path,
    method: c.req.method,
  })
})

// Export the Vercel handler
export default handle(app)

// Also export individual HTTP methods for Vercel
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
export const OPTIONS = handle(app)
