const io = require('socket.io')(4000, {
    cors : ['http://localhost:3000', 'http://localhost:4000']
});

io.on('connection', (socket) => { 
    console.log(socket.id);
    socket.on('sendMessage', (message, user) => {
        if(user === '') {
        socket.broadcast.emit('receiveMessage', message); 
        } else { socket.to(user).emit('receiveMessage', message); }
    }
    );
    socket.on('userConnect', (user, cd) => {
        socket.join(user);
        cd(`${user} has joined been connected`);
    });
}); 