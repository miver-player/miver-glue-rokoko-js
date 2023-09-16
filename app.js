var WebSocket = require('ws');
var wsurl = "ws://54.203.235.138:3000/bvh_server";
var ws = null;

function connect() {
    ws = new WebSocket(wsurl);
    ws.onopen = function() {

    };
  
    ws.onmessage = function(e) {
      console.log('Message:', e.data);
    };
  
    ws.onclose = function(e) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(function() {
        connect();
      }, 1000);
    };
  
    ws.onerror = function(err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
    };
}
  
connect();


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
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(msg);
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
