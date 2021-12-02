//This File Create To Put CRUD Oprations Depand on userSchema
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT = Number(process.env.SALT);

//regester code
const regester = async (req, res) => {
  const { email, username, password, avter, role, delet } = req.body;
  const saveEmail = email.toLowerCase();
  const savePassword = await bcrypt.hash(password, SALT);
  const newUser = new userModel({
    username,
    email: saveEmail,
    password: savePassword,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
//login code
const login = (req, res) => {
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
          };
          if (savePassword) {
            const token = jwt.sign(payload, SECRT_KEY);
            res.status(200).json({ result, token });
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

module.exports = { regester, login, getuser, deletedUser };
