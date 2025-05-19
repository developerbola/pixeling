import { uploadController } from "../controllers/uploadController.js";

export const registerUploadRoutes = (app) => {
  app.post("/upload", uploadController);
};
