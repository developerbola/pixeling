// images
import images from "../controllers/images/images.contoller.js";
import singleImage from "../controllers/images/single-image.controller.js";
import upload from "../controllers/images/upload.controller.js";
import search from "../controllers/images/search.conroller.js";
import download from "../controllers/images/download.controller.js";
// user
import userImages from "../controllers/user/user-images.controller.js";
import user from "../controllers/user/user.controller.js";
import userByName from "../controllers/user/userByName.controller.js";
import editUser from "../controllers/user/edit-user.controller.js";
import auth from "../controllers/user/auth.controller.js";
import addComment from "../controllers/comments/add-comment.controller.js";
import getComments from "../controllers/comments/get-comments.controller.js";
// comments

export const useRoutes = (app) => {
  // user
  app.get("/:user_uuid/images", userImages);
  app.post("/user/:user_uuid", editUser);
  app.get("/user/:user_uuid", user);
  app.get("/user/username/:username", userByName);
  app.post("/protected", auth);
  // images
  app.get("/images", images);
  app.get("/image/:uuid", singleImage);
  app.get("download", download);
  app.post("/search", search);
  app.post("/upload", upload);
  // comments
  app.get("/comments/:image_uuid", getComments);
  app.post("/comments/add", addComment);

  // home route
  app.get("/", (c) => c.json({ message: "Pixeling backend is working!" }));

  // catch-all
  app.all("*", (c) =>
    c.json({
      message: "Route not found",
      path: c.req.path,
      method: c.req.method,
    })
  );
};
