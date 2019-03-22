// Importing the routes
const express = require("express");
const sensourRoutes = require("./../routes/sensors");
const resources = require("./../resources/model");
const cors = require("cors");

let app = express();

app.use(cors());

app.use("/pi/sensors", sensourRoutes);

app.get("/pi", (req, res) => {
  res.send("Welcome to the LifeOfPi!");
});

module.exports = app;
