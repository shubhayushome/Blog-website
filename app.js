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
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
  const data= new Blog({
    name: _.capitalize(req.body.postTitle),
    blogs: req.body.postBlog
  });
  data.save();
  res.redirect("/");
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
