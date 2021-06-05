const express = require("express");
const expHbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//declare mongodb_uri and port and product
const mongoUri =
  "mongodb+srv://tanjiro:konnoyaro55066@cluster0.z7p3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.port || 3000;
let Product = require("./models/product");

//setup app
const app = express();

//setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setup handlebars
app.engine("handlebars", expHbs());
app.set("view engine", "handlebars");

//mongoose connection setup
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err", err.message);
  });

//routes setup
app.get("/", (req, res) => {
  res.render("products");
});

//get data from form route
app.post("/", (req, res) => {
  console.log(req.body);
});

//display all data route
app.get("/display", async (req, res) => {
  try {
    const products = await products.find({}).lean();
    console.log(products);
    res.render("display", { products: products });
  } catch (error) {
    console.log(error);
  }
});

//listen and port
app.listen(3000, () => {
  console.log("App is on 3000");
});
