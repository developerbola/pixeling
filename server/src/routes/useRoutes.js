import getImages from "../controllers/get-images.contoller.js";
import singleImageController from "../controllers/single-image.controller.js";
import uploadController from "../controllers/upload.controller.js";
import authController from "../controllers/auth.controller.js";
import getUserImages from "../controllers/get-user-images.controller.js";

export const useRoutes = (app) => {
  // get
  app.get("/images", getImages);
  app.get("/:user_uuid/images", getUserImages);
  // post
  app.post("/image/:uuid", singleImageController);
  app.post("/upload", uploadController);
  app.post("/protected", authController);

  // Home route
  app.get("/", (c) => c.json({ message: "Pixeling backend is working!" }));

  // Catch-all
  app.all("*", (c) =>
    c.json({
      message: "Route not found",
      path: c.req.path,
      method: c.req.method,
    })
  );
};
