const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const warrantyRouter = require("./routes/warranty.js");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs());

mongoose.connect("mongodb://localhost:27017/warrdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "handlebars");

app.use("/", warrantyRouter);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
