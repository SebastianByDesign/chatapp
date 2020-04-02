// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['message'],

    template: `
        <div class="new-message d-flex mb-4" :class="{ 'justify-content-start' : receive, 'justify-content-end' : user, 'justify-content-center' : connect }">
            <div :class="{ 'message-receive' : receive, 'message-send' : user, 'connect-message' : connect }">{{ message }}</div>
        </div>
    `,

    data: function() {
        // nothin here yet, but there will be
        return {
            user: this.$parent.user == "you",
            receive: this.$parent.user == "other",
            connect: this.$parent.user == ""
        }
    }
}