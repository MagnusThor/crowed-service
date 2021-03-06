import { ChatController } from "./Controllers/ChatController";

let express = require("express");

let app = express();
 
var thorio = require("thor-io.vnext").ThorIO;

var thorIO = new thorio.Engine(
  [
      ChatController
     ]
); 



var expressWs = require("express-ws")(app);

app.use("/", express.static("debug"));
app.use("/lib", express.static("node_modules")); 

app.ws("/", function (ws, req) {    
       thorIO.addWebSocket(ws,req);
});

var port = process.env.PORT || 1337;
app.listen(port);

