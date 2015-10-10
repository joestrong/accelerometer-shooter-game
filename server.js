var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: false});
var users = [];
	
app.configure(function(){
  app.use('/mobile', express.static(__dirname + '/mobile'));
  app.use('/game', express.static(__dirname + '/game'));
  app.use('/lib', express.static(__dirname + '/lib'));
  app.use('/components', express.static(__dirname + '/node_modules'));
});

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {

	console.log('connection via socket.io');
	
	socket.on('crosshair', function(data){
    console.log(data.xper * 100);
    console.log(data.yper * 100);
    io.sockets.emit('crosshairpos', data);
	});

  socket.on('shot', function(){
    console.log('shot');
    io.sockets.emit('shot');
  });

});

server.listen(8000);
console.log('server listening on port 8000');
