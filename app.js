var connect = require('connect');
var http = require('http');
var io = require('socket.io');
var url = require('url') ;

var gui = require('./data_modules/gui');

const PORT = 8080;

var sourcePublic = connect().use(connect.static('public'));
var server = http.createServer(sourcePublic);
server.listen(PORT);

console.log('Server running at http://127.0.0.1:' + PORT + '/');

var socketListener = io.listen(server);

gui.initialize(socketListener);

socketListener.sockets.on('connection', function (socket) {
  socket.on('msg', function (data) {
  	console.log(data);
    io.sockets.emit('new', data);
  });
});