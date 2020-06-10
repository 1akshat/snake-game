const WS = require('ws');

const server = new WS.Server({ port: 8080 });
server.on('connection', (webSocket) => {
    // keep a list of users playing snake game
    const users = [];

    webSocket.on('message', (message) => {
        const incomingUser = JSON.parse(message);

        const indexOfIncomingUser = users.findIndex(user => user.id === incomingUser.id);
        const isNewUser = indexOfIncomingUser < 0;

        if (isNewUser) {
            users.push(incomingUser);
        } else {
            users.splice(indexOfIncomingUser, 1);
            users.push(incomingUser);
        }

        // forward details of user back to all web sockets opened in browser
        // exaple - User 2 detail is here. it will be sent to User 1. And User 1 will update snake game accordingly
        webSocket.send(JSON.stringify(incomingUser));
    });
});