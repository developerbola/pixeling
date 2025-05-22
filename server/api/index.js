import { Hono } from "hono"
import { handle } from "hono/vercel"
import dotenv from "dotenv"
dotenv.config()

// Import your middleware and routes
import { useCors } from "../src/middlewares/corsMiddleware.js"
import { useRoutes } from "../src/routes/useRoutes.js"

// Create the Hono app without basePath
const app = new Hono()

// Apply middleware and routes
const useCorsHook = useCors
const useRoutesHook = useRoutes
useCorsHook(app)
useRoutesHook(app)

// Export the handle function for Vercel
export default handle(app)
