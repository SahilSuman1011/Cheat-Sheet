 const express = require('express')
const app = express()
// const mongoose =require('express')
// const mongoose =require('mongoose')
const note=require('./models/note')
const user=require('./models/users')
app.use(express.json({extended :true}))
app.use(express.urlencoded())
const port = 3000
// mongoose.connect("mongodb://0.0.0.0:27017/mydb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var db = mongoose.connection;

// check connect

db.on("error", () => console.log("error in connecting database"));
db.once("open", () => console.log("Connected to Database"));

// app.get("/", (req, res) => {
//   res.set({
//     "Allow-access-Allow-Origin": "*",
//   });

//   return res.redirect("index.html");
// });
//endpoints to server the html
app.get('/', (req, res) => {
  res.sendFile("pages/index.html",{root: __dirname})
})
app.get('/login', (req, res) => {
  res.sendFile("pages/login.html",{root: __dirname})
})
app.get('/signup', (req, res) => {
  res.sendFile("pages/signup.html",{root: __dirname})
})
//endpoints for APIs
app.post('/getnotes',async (req, res) => {
  // const {usertoken}=req.body
  let notes=await note.find({email:req.body.email})
  res.status(200).json({success:false,message:"notes"})
})
app.post('/login', async (req, res) => {
  // const {usertoken}=req.body
  let user=await user.findOne(req.body)
  console.log(user)
   if(!user)
   {
    res.status(200).json({success:false,message:"no user found "})
   }
   else
   {
    res.status(200).json({success:true,user:{email:user.email},message:"Logged In "})
   }
  res.sendFile("pages/signup.html",{root: __dirname})
})

app.post('/signup', async (req, res) => {
  const {usertoken}=req.body
  console.log(req.body)
  let user= await User.create(req.body)
  res.status(200).json({success:true,user:user})
})

app.post('/addnote', async (req, res) => {
  const {usertoken}=req.body
  let note=await note.create(req.body)
  res.status(200).json({success:true,note})
})

app.post('/deletenote', (req, res) => {
  const {usertoken}=req.body
  res.sendFile("pages/signup.html",{root: __dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
/*
mongoose is used to format the data while storing it 
key is required to store all neccessity 
*/ 