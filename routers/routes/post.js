const express = require("express");
const {
  createPost,
  showPosts,
  updatpostimg,
  desUpdetpost,
  delPost,
} = require("./../controllers/post");
const authorization = require("./../middleware/authorization");
const authentication = require("./../middleware/authentication");
const postRouter = express.Router();

postRouter.post("/createpost", authentication, createPost);
postRouter.get("/showPost", authentication, showPosts);
postRouter.put("/imgupdat/:id", updatpostimg);
postRouter.put("/desupdate/:id", desUpdetpost);
postRouter.delete("/deletepost", delPost);

module.exports = postRouter;
