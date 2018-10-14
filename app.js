var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var nspDefault = io.of('/default');

nspDefault.on('connection', function(socket) {
  console.log('Client has connected');
  socket.emit('roomQuery');
  socket.on('room', function(roomAssignment) {
    console.log(roomAssignment)
    socket.join(roomAssignment);
    socket.room = roomAssignment;
  })

  socket.on('message', function(messageData) {
    console.log(messageData);
    console.log(socket.room)
    nspDefault.in(socket.room).emit('message', messageData);
  })
})

nspDefault.on('message', function(messageData) {
  nspDefault.to('')
})

server.listen(80, function() {
  console.log('Listening on 80')
});
