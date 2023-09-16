var WebSocket = require('ws');
var wsurl = "ws://54.203.235.138:3000/bvh_server";
var ws = new WebSocket(wsurl);


ws.on('open', function open() {
  ws.send("connected");
});

// reconnect on close

ws.on('close', function close() {
    console.log('disconnected');
    ws = new WebSocket(wsurl);
});

ws.on('error', function error() {
    console.log('disconnected');
    ws = new WebSocket(wsurl);
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
