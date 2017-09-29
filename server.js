"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatController_1 = require("./Controllers/ChatController");
var express = require("express");
var app = express();
var thorio = require("thor-io.vnext").ThorIO;
var thorIO = new thorio.Engine([
    ChatController_1.ChatController
]);
var expressWs = require("express-ws")(app);
app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules"));
app.ws("/", function (ws, req) {
    thorIO.addWebSocket(ws, req);
});
var port = process.env.PORT || 1337;
app.listen(port);
//# sourceMappingURL=server.js.map