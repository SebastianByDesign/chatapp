// imports always go first - if we're importing anything

const socket = io();

function setUserId(packet) {
    console.log(packet);
}

function runDisconnectMessage(packet) {
    console.log(packet);
}

// event handling

socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);