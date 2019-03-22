// Importing the routes
const express = require("express");
//const sensourRoutes = require("./sensors");
const resources = require("../resources/model");
const cors = require("cors");
const PiCamera = require("pi-camera");
const base64img = require("base64-img");

const myCamera = new PiCamera({
  mode: "photo",
  output: `/home/pi/Pictures/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true
});

let app = express();
app.use(express.static("public"));

app.use(cors());

// Routes for the sensors

app.get("/", (req, res, next) => {
  res.send(resources);
});

app.get("/sensors", (req, res) => {
  res.send(resources.pi.sensors);
});

app.get("/sensors/pir", (req, res) => {
  res.send(resources.pi.sensors.pir);
});

app.get("/sensors/camera", (req, res) => {
  res.send(resources.pi.sensors.camera);
});

app.get("/sensors/camera/picture", async (req, res) => {
  myCamera
    .snap()
    .then(result => {
      console.log("it is saved my dude");
      base64img.base64("/home/pi/Pictures/test.jpg", (err, data) => {
        if (err) {
          return err;
        }
        res.send(200, data);
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
// module.exports = router;
