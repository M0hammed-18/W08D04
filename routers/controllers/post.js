const postModel = require("./../../db/models/post");


const createPost = (req, res) => {
    const { img,userId,desc,isDelete ,commentId} = req.body;
    const newPost = new postModel({
        img,
        desc,
      userId,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  const showPosts = (req, res) => {
    postModel
    .find({isDelete : false})
    .then((result) => {

         res.status(200).json(result);
      
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



  module.exports= {createPost,showPosts};