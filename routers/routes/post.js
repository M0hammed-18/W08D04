const express = require("express");
const {createPost,showPosts}=require("./../controllers/post")

const postRouter = express.Router();

postRouter.post("/createpost",createPost)
postRouter.get("/show",showPosts)

module.exports = postRouter;
