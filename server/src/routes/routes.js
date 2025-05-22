import { getImages } from "../controllers/get-images.contoller.js";
import { uploadController } from "../controllers/upload.controller.js";

export const useRoutes = (app) => {
  // Test route
  app.get("/test", (c) => {
    return c.json({ message: "Test route working!" });
  });

  app.get("/images", getImages);
  // app.post("/upload", uploadController);
};
