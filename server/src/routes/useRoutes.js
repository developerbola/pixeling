const { getImages } = require("../controllers/get-images.contoller.js");
const { uploadController } = require("../controllers/upload.controller.js");

console.log(process.env.SUPABASE_URL);

const useRoutes = (app) => {
  app.get("/images", getImages);
  app.post("/upload", uploadController);

  // Home route
  app.get("/", (c) => {
    return c.json({ message: "Pixeling backend is working!" });
  });

  // Test route
  app.get("/test", (c) => {
    return c.json({ message: "Test route working!" });
  });
};

module.exports = { useRoutes };
