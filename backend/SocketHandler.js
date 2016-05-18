var port = 80;

var io;

module.exports = {

    init:function( app, plates){
    	io = require('socket.io').listen(app.listen(port));

		io.sockets.on( 'connection', function ( socket) {

			console.log('Alguien se ha conectado con Sockets');
			socket.emit('messages', "123");

			socket.on('getAllPlates', function(data) {
				socket.emit('allPlates', plates.toJSON());
			});

			socket.on('create', function(data) {
				plates.generateCSV();
			});

			/*setInterval(function(){
				socket.emit('date', "date");
			}, 1000);*/
		
			socket.on('close', function(exception) {
  				console.log('SOCKET CLOSED');
			});
   		})
	},

	emitNewPlate:function(data){
		io.sockets.emit('newPlate', data);
	}
};

