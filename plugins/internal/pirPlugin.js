let resources = require("./../../resources/model");

let interval;
let sensor;
const model = resources.pi.sensors.pir;
const pluginName = resources.pi.sensors.pir.pluginName;
let localParams = { simulate: false, frequency: 2000 };

exports.start = params => {
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = () => {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info("%s plugin stopped", pluginName);
};

function connectHardware() {
  let Gpio = require("onoff").Gpio;
  sensor = new Gpio(model.Gpio, "in", "both");
  sensor.watch((err, value) => {
    if (err) exit(err);
    model.value = !!value;
    showValue();
  });
  console.info("Hardware %s sensor started!", pluginName);
}

function simulate() {
  interval = setInterval(() => {
    model.value = !model.value;
    showValue();
  }, localParams.frequency);
  console.info("Simulated %s sensor started!", pluginName);
}

function showValue() {
  console.info(
    model.value ? "There is movement!" : "There is no movement anymore!"
  );
}
