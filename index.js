const express = require("express");
const dotenv = require("dotenv");
require("./db/index");

dotenv.config();

const app = express();
app.use(express.json());

const roleRouter=require("./routers/routes/role")
app.use(roleRouter)

const userRouter=require("./routers/routes/user")
app.use(userRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});