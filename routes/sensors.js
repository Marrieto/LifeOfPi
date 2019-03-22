// Routes for the sensors

let express = require("express");
let router = express.Router();
let resources = require("./../resources/model");

router.route("/").get((req, res, next) => {
  res.send(resources.pi.sensors);
});

module.exports = router;
