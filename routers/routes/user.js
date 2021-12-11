//Create This File To Put Endpoint
const express = require("express");
const {
  regester,
  login,
  deletedUser,
  getuser,
  verifyacount
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
const userRouter = express.Router();

userRouter.post("/singup", regester);
userRouter.post("/loginn", login);
userRouter.post("/check",verifyacount)

userRouter.delete("/user/:id",authentication,authorization, deletedUser);
userRouter.get("/users",authentication,authorization, getuser);

module.exports = userRouter;
