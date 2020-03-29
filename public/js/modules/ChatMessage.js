// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['message'],

    template: `
        <p class="new-message" :class="{ 'my-message' : user, 'connect-message' : connect }">{{ message }}</p>
    `,

    data: function() {
        // nothin here yet, but there will be
        return {
            user: this.$parent.user == "you",
            connect: this.$parent.user == ""
        }
    }
}