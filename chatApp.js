const chatApp = (server) =>{
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    const userId = socket.conn.id

    console.log('socket connected: ' + userId);

    io.emit('chatMessages', 'New user connected. Total Online: ' + socket.conn.server.clientsCount);
    
    socket.on('message', (data) => {
      console.log(data);
      socket.broadcast.emit('chatMessages', userId + ' says : '+  data);
    });

    socket.on('disconnect', () =>{
      io.emit('chatMessages', 'User disconnected. Total Online: ' + socket.conn.server.clientsCount);
      console.log('socket disconnected: '+ socket.conn.id);
    });
  });
}


module.exports = chatApp;