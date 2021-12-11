//This File Create To Put CRUD Oprations Depand on userSchema
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SALT = Number(process.env.SALT);
dotenv.config();

//regester code
const regester = async (req, res) => {
  console.log(req);
  const { email, username, password } = req.body;
  const saveEmail = email.toLowerCase();
  const savePassword = await bcrypt.hash(password, SALT);
  console.log(saveEmail);
  console.log(savePassword);

  const newUser = new userModel({
    username,
    email: saveEmail,
    password: savePassword,

  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyacount=async (req,res)=>{
  const {id,code}=req.body;
  const user = await userModel.findOne({_id:id});
  if(user.activecode==code){
    userModel.findByIdAndUpdate(id,{active:true,activecode:""},{new:true}).then ((result)=>{
      res.status(201).json(result);
    }).catch((err)=>{
      res.status(400).json(err);
    })
  } else{
    res.status(400).json("code is not valid");
  }
}
//login code
const login = (req, res) => {
  console.log(req);
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

module.exports = { regester, login, getuser, deletedUser,verifyacount };
