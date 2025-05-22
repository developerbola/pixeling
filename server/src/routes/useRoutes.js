const { getImages } = require("../controllers/get-images.contoller");
const { uploadController } = require("../controllers/upload.controller");

export const useRoutes = (app) => {
  app.get("/images", getImages);
  app.post("/upload", uploadController);

  // Test route
  app.get("/test", (c) => {
    return c.json({ message: "Test route working!" });
  });
};
