const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("your mongodb uri",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const dataSchema={
    name:String,
    age:Number
};
const Data=mongoose.model("Data",dataSchema);
app.get("/",function(req,res){
    res.render("index")
});
app.post("/",function(req,res){
    const name=req.body.name;
    const age=req.body.age;
    const data=new Data({
        name:name,
        age:age
    });
    data.save();
    if(res.statusCode==200){
        res.render("infopage",{
            status:"success"
        })
    }
})

app.listen(3000,function(){
    console.log("server spinning at port 3000");
})
