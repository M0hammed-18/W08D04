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