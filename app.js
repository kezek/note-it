var connect = require('connect');
var http = require('http');
var io = require('socket.io');
var $ = require('jquery');

var template = require('./data_modules/template');
var gui = require('./data_modules/gui');

const PORT = 8080;
const NotFoundMessage = 'wtf is dis. go back';

var sourcePublic = 
  connect()
  .use(function (req, res){
    template.load(function (markup){
      res.end(markup);
    });  
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