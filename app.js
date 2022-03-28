const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+ "/date.js");

console.log(date());

const app = express();
let items=[];
let workList=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

let day = date();
res.render("lists", {listTitle: day, newListItems: items});
});


app.post("/",function(req,res){

  let item = req.body.ToDoList

if(req.body.list === "Work"){
workList.push(item);
res.redirect("/work");
}
else{
  items.push(item);
  res.redirect("/");
}

});


app.get("/work", function(req,res){
  res.render("lists", {listTitle: "Work List", newListItems: workList})
});

app.post("/work", function(req,res){
  let item= req.body.ToDoList;
  workList.push(item);
  res.refirect("/work");
});


app.get("/about", function(req,res){
  res.render("about");
});


app.listen(3001, function() {
  console.log("Server started on port 3001.");
});
