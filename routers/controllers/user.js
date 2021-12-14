//This File Create To Put CRUD Oprations Depand on userSchema
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
const SALT = Number(process.env.SALT);
const passport = require("passport");
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;
// const CLIENT_URL = "http://localhost:5000";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

//regester code
const regester = async (req, res) => {
  const { username, email, password, role, img } = req.body;
  const semail = email.toLowerCase();
  const hashpass = await bcrypt.hash(password, SALT);
  const characters = "0123456789";
  let activeCode = "";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const newUser = new userModel({
    email: semail,
    password: hashpass,
    username,
    role,
    img,
    activeCode,
  });
  newUser
    .save()
    .then((result) => {
      transport
        .sendMail({
          from: "mg7l@hotmail.com",
          to: semail,
          subject: "Please confirm your account",
          html: `<h1>Email Confirmation</h1>
              <h2>Hello ${semail}</h2>
              <h4>CODE: ${activeCode}</h4>
              <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
              <a href=https://social-media-project-frontend.herokuapp.com/verify_account/${result._id}> Click here</a>
              </div>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });
  console.log(user);
  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(id, { state: "Active", activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong code..");
  }
};
const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset Your Password",
            html: `<h1>Reset Your Password</h1>
              <h2>Hello ${result.username}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              <a href=https://social-media-project-frontend.herokuapp.com/reset_password/${result._id}> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code...");
  }
};
const login = (req, res) => {
  // console.log(req);
  const { email, password } = req.body;
  const SECRT_KEY = process.env.SECRT_KEY;

  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const savePassword = await bcrypt.compare(password, result.password);
          const payload = {
            role: result.role,
            Id: result._id,
            email: result.email,
          };
          if (savePassword) {
            if (result.state == "Active") {
              const token = jwt.sign(payload, SECRT_KEY);
              res.status(200).json({ result, token });
            } else {
              res.status(400).json("please Active your account");
            }
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
////////////////////////////////////////////
const getuser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

////////////////////////////////////////
const deletedUser = (req, res) => {
  const { id } = req.params;

  userModel
    .findByIdAndUpdate(id, { isDelete: true })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  regester,
  getuser,
  deletedUser,
  login,
  verifyAccount,
  checkEmail,
  resetPassword,
};
