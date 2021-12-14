const postModel = require("./../../db/models/post");
const commentsModel =require("./../../db/models/comment")

const createPost = (req, res) => {
  // console.log(req);
  const { img, userId, desc, isDelete, commentId } = req.body;
  const newPost = new postModel({
    img,
    desc,
    userId: req.token.Id,
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
    .find({isDel:false})
    .populate("like commentId desc")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getPost = (req, res) => {
  const { id } = req.params;
  try {
    postModel.findOne({ _id: id }).then((result) => {
      if (result.isDel == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Post deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error,"ll");
  }
};

const updatpostimg = (req, res) => {
  const { id } = req.params;
  const { img } = req.body;

  postModel
    .findByIdAndUpdate(id, { img })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const desUpdetpost = (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  postModel
    .findByIdAndUpdate(id, { $set: { desc } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const delPost = (req, res) => {
  const { id } = req.params;

  postModel
    .findByIdAndRemove(id)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { createPost, showPosts, updatpostimg, desUpdetpost, delPost,getPost };
