const express =require("express");
const bodyParser = require ("body-parser");
const { it } = require("node:test");
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine','ejs');
let items=[];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res)
{
    let day= date();
   
    res.render("list",{kindofday:day, newlistitems:items});
});
app.post("/",function(req,res){
    let item = req.body.newItem;

    if(req.body.list == "Work")
    {
        workItems.push(item);
        res.redirect("/work");

    }else{
        items.push(item);
        res.redirect("/");
    }
    
});
app.get("/work", function(req,res)
{
    res.render("list",{kindofday: "Work List",newlistitems:workItems});

});
app.post("/work", function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function(){
    console.log("Server has started at 3000 port");
});