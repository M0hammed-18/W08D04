const express = require("express");
const {createPost,showPosts,updatpostimg,desUpdetpost}=require("./../controllers/post")

const postRouter = express.Router();

postRouter.post("/createpost",createPost)
postRouter.get("/show",showPosts)
postRouter.put("/imgupdat/:id",updatpostimg)
postRouter.put("/desupdate/:id",desUpdetpost)



module.exports = postRouter;
