const httpServer = require("./routes/http");
const wsServer = require("./routes/websockets");
const resources = require("./resources/model");

const pirPlugin = require("./plugins/internal/pirPlugin");

pirPlugin.start({ simulate: true, frequency: 2000 });

var server = httpServer.listen(resources.pi.port, function() {
  console.log("HTTP server started...");
  wsServer.listen(server);
  console.info("Your WoT Pi is up and running on port %s", resources.pi.port);
});
