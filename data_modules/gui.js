var gui = {
	socket : null,
	initialize: function (socket){
		this.socket = socket;
		this.socket.on('new', gui.add);
		this.send();
	},
	add: function (data){
		console.log(data);
	},
	send: function(){
		console.log('emitting msg');
		this.socket.emit('msg', {name: 'test', msg: 'test message'});
	}
}

module.exports = gui;


