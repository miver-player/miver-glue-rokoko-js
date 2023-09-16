var WebSocket = require('ws');

const ws = new WebSocket('ws://54.203.235.138:3000/bvh_server');

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send("connected");
});


var dgram = require("dgram");
var udpServer = dgram.createSocket("udp4");

udpServer.on("error", function (err) {
    console.log("udpServer error:\n" + err.stack);
    udpServer.close();
    }
);

udpServer.on("message", function (msg, rinfo) {
    console.log("udpServer got: " + msg + " from " + rinfo.address + ":" + rinfo.port + "\n");
    // if ws is open, send msg
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
    //var x = msg.toString().trim().split(" ").join(" ");
    //console.log(JSON.parse(msg).scene.actors);
    }
);

udpServer.on("listening", function () {
    var address = udpServer.address();
    console.log("udpServer listening " + address.address + ":" + address.port);
    }
);

udpServer.bind(14043);
