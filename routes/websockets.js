const WebSocketServer = require("ws").Server;

exports.listen = function(server) {
  var wss = new WebSocketServer({ server: server });
  console.info("WebSocket server started...");
  wss.on("connection", function(ws, req) {
    var url = ws.upgradeReq.url;
    console.info(url);
    try {
      Object.observe(selectResource(url), function(changes) {
        ws.send(JSON.stringify(changes[0].object), function() {});
      });
    } catch (e) {
      console.log("Unable to observe %s resource!", url);
    }
  });
};
function selectResource(url) {
  var parts = url.split("/");
  parts.shift();
  var result = resources;
  for (var i = 0; i < parts.length; i++) {
    result = result[parts[i]];
  }
  return result;
}
