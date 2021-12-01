//This File To Create DB and Connect it 
const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config();
const DB_URI=process.env.DB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
mongoose.connect(DB_URI,options).then(()=>{
    console.log("DB READ TO USE");
},
(err)=>{
    console.log(err);
}
)
