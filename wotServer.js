const httpServer = require("./servers/http");
const resources = require("./resources/model");

const pirPlugin = require("./plugins/internal/pirPlugin");

pirPlugin.start({ simulate: true, frequency: 2000 });

const server = httpServer.listen(resources.pi.port, () => {
  console.info("Your LifeOfPi is up and running on port %s", resources.pi.port);
});
