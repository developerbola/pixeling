import images from "../controllers/images.contoller.js";
import singleImage from "../controllers/single-image.controller.js";
import upload from "../controllers/upload.controller.js";
import auth from "../controllers/auth.controller.js";
import userImages from "../controllers/user-images.controller.js";
import search from "../controllers/search.conroller.js";
import user from "../controllers/user.controller.js";

export const useRoutes = (app) => {
  // get
  app.get("/images", images);
  app.get("/:user_uuid/images", userImages);
  app.get("/image/:uuid", singleImage);
  app.get("/user/:uuid", user);
  // post
  app.post("/search", search);
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
