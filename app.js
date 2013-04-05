var connect = require('connect');
var http = require('http');
var io = require('socket.io');
var url = require('url') ;
var $ = require('jquery');

var gui = require('./data_modules/gui');

const PORT = 8080;
const NotFoundMessage = 'wtf is dis. go back';
var sourcePublic = 
		connect()
			.use(connect.static('public'))
			.use(function (req, res){
				console.log('404: ' + req.url);	
				res.end(NotFoundMessage);
			});

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

  socket.on('broadcast', function (data){
  	gui.update(data);
  });
});