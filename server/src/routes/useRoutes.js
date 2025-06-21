import getImages from "../controllers/get-images.contoller.js";
import singleImage from "../controllers/single-image.controller.js";
import upload from "../controllers/upload.controller.js";
import auth from "../controllers/auth.controller.js";
import getUserImages from "../controllers/get-user-images.controller.js";
import search from "../controllers/search.conroller.js"

export const useRoutes = (app) => {
  // get
  app.get("/images", getImages);
  app.get("/:user_uuid/images", getUserImages);
  app.get("/image/:uuid", singleImage);
  // post
  app.post("/search",search);
  app.post("/upload", upload);
  app.post("/protected", auth);

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
