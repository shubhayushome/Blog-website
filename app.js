//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const ejs = require("ejs");
var _=require("lodash");
mongoose.connect("mongodb+srv://Shubhayu:Z3Z5AbNay2yPcyqa@cluster0.8mywdid.mongodb.net/blogpostDB",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connected");})
.catch((err)=>{console.log(err);})
const blogSchema=new mongoose.Schema({
  name: String,
  blogs: String,
});
const Blog=mongoose.model("Items",blogSchema);
const homeStartingContent = "A Simple Way to post your personal thoughts. Choose it to post your thoughts at the end of the day. Revisit them whenever you like.What are you waiting for? Click create and start writng.";
const aboutContent = "A Simple Website built using Express, Javascript And Css. Used to Collaborate and Jot down your thoughts at the end of the day.";
const contactContent = "Name: Shubhayu Shome            Contact No.: +91 8697701811           Email-id : shubhayushome123@gmail.com";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function (req,res) {
  Blog.find({})
  .then((result)=>{
    res.render('home',{ para_1 : homeStartingContent,posts : result});})
  .catch(function(err){
    console.log(err);
   })
  ;
  
  
})
app.get("/contact",function (req,res) {
  res.render('contact',{para_3 : contactContent});
})
app.get("/about",function (req,res) {
  res.render('about',{para_2:aboutContent});
})
app.get("/compose",function (req,res) {
  res.render('compose');
})
app.post("/compose",function (req,res) {
  const newName=_.capitalize(req.body.postTitle);
  Blog.find({name:newName})
  .then((result)=>{
     if(result.length === 0)
     {
      const data= new Blog({
        name: newName,
        blogs: req.body.postBlog
      });
      data.save()
      .then(()=>{console.log("Saved");
      res.redirect("/");})
    .catch((err)=>{console.log(err);
      res.redirect("/");})
    }
     else
     {
      res.redirect("/");
     }
     
  })
    .catch(function(err){
      console.log(err);
     })
    ;
  
  
  
})

app.get("/posts/:topic",function (req,res) {
  
  const newName= _.capitalize(req.params.topic);
  
  Blog.find({name:newName})
  .then((result)=>{
    console.log(result);
    res.render('post',{ posts : result});})
  .catch(function(err){
    console.log(err);
   })
  ;
})
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
