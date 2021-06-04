const express = require("express")
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/warranty.html");
})
app.post("/",function(req,res){
    console.log(req.body);
    res.send("<h1>POST</h1>")
})
app.listen(3000,function(){
    console.log("Server running on port 3000");
})