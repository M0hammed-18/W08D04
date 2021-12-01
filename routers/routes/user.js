//Create This File To Put Endpoint
const express = require("express");
const { regester, login } = require("./../controllers/user");
const userRouter = express.Router();

userRouter.post("/regester", regester);
userRouter.post("/login", login);

module.exports = userRouter;
