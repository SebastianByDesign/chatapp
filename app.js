var express = require('express');
var app = express();

const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is where all the socket.io messaging functions go
io.attach(server);

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        io.emit('user-connected', name)
    })

    //listen for an incoming message from user
    socket.on('chat-message', message => {
        io.emit('new-message', { id: socket.id, message: message });
    })

    //listen for disconnect
    socket.on('disconnect', () => {
        io.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });
});

    // socket.on('typing', function(data) {
    //     socket.broadcast.emit("typing", data)
    // });