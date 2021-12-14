const express = require("express");
const {
  createPost,
  showPosts,
  updatpostimg,
  desUpdetpost,
  delPost,
  getPost,
} = require("./../controllers/post");
const authorization = require("./../middleware/authorization");
const authentication = require("./../middleware/authentication");
const postRouter = express.Router();

postRouter.post("/createpost", authentication, createPost);
postRouter.get("/showPost",showPosts);
postRouter.get("/shpost/:id",getPost);
postRouter.put("/imgupdat/:id", updatpostimg);
postRouter.put("/desupdate/:id",authentication, desUpdetpost);
postRouter.delete("/deletepost/:id", delPost);

module.exports = postRouter;
