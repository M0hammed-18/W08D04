const commentsModel = require("./../../db/models/comment");
const postModel =require("./../../db/models/post")

const creatComment = (req, res) => {
  const { desc, postID,userId } = req.body;

  const newComment = new commentModel({
    desc,
    post: postID,
    userId,
  });

  newComment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const editComment = (req, res) => {
    const { id } = req.params;
    const { desc,postID } = req.body;
  
    commentModel
      .findByIdAndUpdate(id, { $set: { desc } }, { new: true })
      .exec() 
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  const removeComment = (req, res) => {
    const { id } = req.params;
  
    commentModel
      .findByIdAndUpdate(id, { isDelete: true }, { new: true })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  module.exports={
    creatComment,
    editComment,
    removeComment
  }