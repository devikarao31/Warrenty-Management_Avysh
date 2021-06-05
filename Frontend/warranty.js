const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs());
mongoose.connect("mongodb://localhost:27017/warrdb", { useNewUrlParser: true,useUnifiedTopology:true });
const warrSchema = {
  warrId: String,
  warrName: String,
  prodId: String,
  resolution: String,
  type: String,
  extendable: Boolean,
  duration: Number,
  extendDur: Number,
  extendPrice: Number,
};
const warranty = mongoose.model("Warranty", warrSchema);
app.set("view engine", "handlebars");
app.get("/", function (req, res) {
  res.render("warranty");
});
app.post("/", function (req, res) {
  console.log(req.body);
  var warrId = req.body.warrid;
  var warrName = req.body.warrname;
  var resolution = Number(req.body.resolution);
  var resolve;
  var duration = Number(req.body.duration)
  if (resolution == 1) {
    resolve = "Repair";
  } else if (resolution == 2) {
    resolve = "Replace";
  } else {
    resolve = "Refund";
  }
  var type = Number(req.body.type);
  var restype;
  if (type == 1) {
    restype = "Onsite";
  } else {
    restype = "Offsite";
  }
  var gridCheck = req.body.gridCheck1;
  var extend;
  if (gridCheck == "on") extend = true;
  else extend = false;
  var extendDur, extendPrice;
  if (extend) {
    extendDur = Number(req.body.extenddur);
    extendPrice = Number(req.body.extendprice);
  }
  const warr = new warranty({
      warrId:warrId,
      warrName:warrName,
      prodId:"prod1",
      resolution:resolve,
      type:restype,
      extendable:extend,
      duration:duration,
      extendDur:extendDur,
      extendPrice:extendPrice
  });
  warr.save(function(err){
      if(!err){
          res.redirect("/")
      }
      else
      {
          console.log(err);
      }
  })

//   res.send("<h1>POST</h1>");
});
// app.get('/display',function(req,res){
//     try {
//         warranty.find({}).lean().exec(function(err,warr){
//             res.render("display",{warr:warr})
//             console.log(warr);
//         })
//         // warranty.find({},function(err,warr){
//         //     res.render("display",{warr:warr})
//         //     console.log(warr);
//         // })
//     } catch (error) {
//         console.log(error);
//     }
// })
app.get('/display',async (req,res)=>{
    try {
        const warr = await warranty.find({}).lean();
        console.log(warr);
        res.render('display',{warr:warr})
    } catch (error) {
        console.log(error);
    }
})
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
