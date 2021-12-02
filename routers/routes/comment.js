const express = require("express");
const {
  creatComment,
  editComment,
  removeComment,
  getComment,
} = require("./../controllers/comment");
const authorization = require("./../middleware/authorization");
const authentication = require("./../middleware/authentication");
const commentRoter = express.Router();
commentRoter.get("/getcomment", authentication, getComment);
commentRoter.post("/addcomment", authentication, creatComment);

commentRoter.put(
  "/editcomment/:id",
  authentication,
  authorization,
  editComment
);
commentRoter.delete("/remove/:id", removeComment);

module.exports = commentRoter;
