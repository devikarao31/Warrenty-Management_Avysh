const Warranty = require("../models/warranty");

exports.renderWarranty = (req, res) => {
  res.render("warranty");
};

exports.handleSubmit = (req, res) => {
  console.log(req.body);
  var warrId = req.body.warrid;
  var warrName = req.body.warrname;
  var resolution = Number(req.body.resolution);
  var resolve;
  var duration = Number(req.body.duration);
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
  const warr = new Warranty({
    warrId,
    warrName,
    prodId: "prod1",
    resolution: resolve,
    type: restype,
    extendable: extend,
    duration,
    extendDur,
    extendPrice,
  });
  warr.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
};

exports.displayWarranty = async (req, res) => {
  try {
    const warr = await Warranty.find({}).lean();
    console.log(warr);
    res.render("display", { warr: warr });
  } catch (error) {
    console.log(error);
  }
};
