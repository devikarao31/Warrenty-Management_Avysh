const mongoose = require("mongoose");

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

module.exports = mongoose.model("Warranty", warrSchema);
