const express = require("express");
const {creatComment,editComment,removeComment}=require("./../controllers/comment")

const commentRoter =express.Router()

commentRoter.post("/addcomment",creatComment)
commentRoter.put("/editcomment/:id",editComment)
commentRoter.delete("/remove/:id",removeComment)

module.exports=commentRoter;