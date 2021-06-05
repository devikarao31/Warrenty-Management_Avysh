const express = require("express");
const router = express.Router();

const {
  renderWarranty,
  handleSubmit,
  displayWarranty,
} = require("../controllers/warranty");

router.get("/", renderWarranty);

router.post("/", handleSubmit);

router.get("/display", displayWarranty);

module.exports = router;
