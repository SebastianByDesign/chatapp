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

io.on('connection', function(socket) {
    console.log('user connected');
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});

    //listen for an incoming message from user
    socket.on('chat_message', function(msg) {
        console.log(msg);

        io.emit('new_message', { id: socket.id, message: msg });
    });

    //listen for disconnect
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        message = `${socket.id} has left the chat`;
        io.emit('user_disconnect', message);
    });
});