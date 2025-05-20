import { getImages } from "../controllers/get-images.contoller.js";
import { uploadController } from "../controllers/upload.controller.js";

export const useRoutes = (app) => {
  app.get("/images", getImages);
  app.post("/upload", uploadController);
};
