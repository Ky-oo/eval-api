var express = require("express");
var router = express.Router();

router.get("/", async function (res, res) {
  res.status(200).json({ message: "Welcome in my CRRRAAAZYYYY API !!" });
});

module.exports = router;
