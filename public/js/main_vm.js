// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js"

const socket = io()

// this is our main Vue instance
const vm = new Vue({
    data: {
        messages: [],
        message: "",
        name: "",
        user: ""
    },

    methods: {

        dispatchMessage() {
            console.log("Sending message")

            socket.emit('chat-message', {
                content: this.message,
                name: this.name
            })

            this.message = ""
        }
    },

    components: {
        newmessage: ChatMessage
    }

}).$mount("#app")

const name = prompt('what is your name?')
vm.name = name

vm.messages.push('You connected')
socket.emit('new-user', vm.name)

socket.on('new-message', message => {
    console.log("Receiving message")
    if(vm.name===message.message.name){
        vm.messages.push(`You: ${message.message.content}`)
        vm.user = "you"
    } else {
        vm.messages.push(`${message.message.name}: ${message.message.content}`)
        vm.user = "other"
    }
})

socket.on('user-connected', name => {
    if(vm.name!==name){
        vm.messages.push(`${name} connected`)
        vm.user = ""
    }
})

socket.on('user-disconnected', name => {
    vm.messages.push(`${name} disconnected`)
    vm.user = ""
})