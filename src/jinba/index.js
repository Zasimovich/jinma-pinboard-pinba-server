var http = require('http');

var JinbaServer = require('jinba-server');

console.log("Start listening...");
http.createServer(JinbaServer.createRequestListener(30002, 'pinba', false)).listen(8888);
console.log("Listening stared.");
