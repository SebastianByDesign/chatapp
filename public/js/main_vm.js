// imports always go first - if we're importing anything
import chatMessage from "./modules/ChatMessage.js";
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    console.log(packet);
}

function appendNewMessage(msg) {
    vm.messages.push(msg);
}

// this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anon"
            })

            this.message = "";//
        }
    },

    components: {
        newmessage: ChatMessage
    },

    mounted: function(){
        console.log('mounted');
    }
}).$mount("#app");

// event handling
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);