const express = require("express");
const {createPost,showPosts,updatpostimg}=require("./../controllers/post")

const postRouter = express.Router();

postRouter.post("/createpost",createPost)
postRouter.get("/show",showPosts)
postRouter.put("/imgupdat",updatpostimg)


module.exports = postRouter;
