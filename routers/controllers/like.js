const likeModel = require("../../db/models/like");
const postModel = require("../../db/models/post");

const addLike = (req, res) => {
  const { postId } = req.body;
  const newlike = new likeModel({
    postId: postId,
    userId: req.token.Id,
  });
  newlike
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(postId, { $push: { like: result._id } })
        .then((result) => {});
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const deleteLike = (req, res) => {
  const { id } = req.params;
  likeModel
    .findByIdAndRemove(id, req.token.Id)
    .exec()
    .then((result) => {
      res.status(200).json("dislike");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
module.exports = { deleteLike, addLike };
