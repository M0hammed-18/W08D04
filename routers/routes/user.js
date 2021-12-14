//Create This File To Put Endpoint
const express = require("express");
const {
  regester,
  login,
  deletedUser,
  getuser,
  verifyAccount,
  checkEmail,
  resetPassword
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
const userRouter = express.Router();

userRouter.post("/singup", regester);
userRouter.post("/loginn", login);

// userRouter.get("/login/err", (req,res)=>res.json({err: 'Incorrect Email/Password'}));
// userRouter.get("/login/success", (req,res)=>res.json({success: 'success'}));
// userRouter.get('/activate/:token', activate);
// userRouter.post('/forgot', forgotPassword);
// userRouter.post('/reset/:id', resetPassword);
// userRouter.get('/forgot/:token', gotoReset);
// userRouter.get('/logout', logout);
// userRouter.post('/reset/:id', resetPassword);
// userRouter.post("/check",verifyacount)

userRouter.delete("/user/:id",authentication,authorization, deletedUser);
userRouter.get("/users",authentication,authorization, getuser);
userRouter.post("/active", verifyAccount);
userRouter.post("/check", checkEmail);
userRouter.post("/resetpas", resetPassword);

module.exports = userRouter;
