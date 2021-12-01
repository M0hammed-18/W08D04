//Create This File To Allow Who Can Edit Information
const roleModel = require("./../../db/models/role");

const authorization = async (req, res, next) => {
  try {
    console.log(req);
    const roleId = req.token.role;
    console.log(roleId);
    const result = await roleModel.findById(roleId);
    console.log(result);
    if (result.role === "admin") {
      next();
    } else {
      return res.status(403).json({ massage: "forbidden" });
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authorization;