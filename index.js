const express = require("express");
const dotenv = require("dotenv");
require("./db/index");

dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});