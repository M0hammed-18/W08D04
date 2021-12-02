//Create This File To Put Endpoint
const express = require("express");
const {
  regester,
  login,
  deletedUser,
  getuser,
} = require("./../controllers/user");
const userRouter = express.Router();

userRouter.post("/regester", regester);
userRouter.post("/login", login);

userRouter.delete("/user/:id", deletedUser);
userRouter.get("/users", getuser);

module.exports = userRouter;
