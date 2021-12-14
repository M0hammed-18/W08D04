const commentsModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");

const creatComment = (req, res) => {
  const { desc, postId } = req.body;
  // const { userId, postId } = req.params;
  console.log(req.token);
  const newComment = new commentsModel({
    desc,
    postId,
    userId: req.token.Id,
  });

  newComment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(postId, { $push: { commentId: result._id } })
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const editComment = (req, res) => {
  const { id } = req.params;
  const { desc, postID } = req.body;

  commentsModel
    .findByIdAndUpdate(id, { $set: { desc: desc } })
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

  commentsModel
    .findByIdAndUpdate(id, { isDelete: true }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getComment = (req, res) => {
  commentsModel
    .find({  })
    .populate("postId", "desc",)

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("you Don't have authorization");
    });
};
module.exports = {
  creatComment,
  editComment,
  removeComment,
  getComment,
};
