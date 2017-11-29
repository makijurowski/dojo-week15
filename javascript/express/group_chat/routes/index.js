/* jshint esversion: 6 */

const users = [];
const messages = [];

function isUser(user) {
    const usersCount = users.length;
    for (let i = 0; i < usersCount; i++) {
        if (user == users[i]) {
            return true;
        }
    }
    return false;
}

module.exports = (app, server) => {
    const io = require("socket.io").listen(server);

    io.sockets.on("connection", (socket) => {
        console.log("New connection established:", socket.id);
        socket.on("page_load", (data) => {
            console.log("Page loaded.");
            const existingUser = isUser(data.user);
            const event = existingUser ? "existing_user" : "load_messages";
            data = existingUser ? { error: "This user already exists." } : { current_user: data.user, messages: messages };

            if (!existingUser) {
                users.push(data.user);
            }

            socket.emit(event, data);
        });

        socket.on("new_message", (data) => {
            messages.push({ name: data.user, message: data.message });
            io.emit("post_new_message", { new_message: data.message, user: data.user });
        });
    });

    app.get("/", (request, response) => {
        response.render("index");
    });
};