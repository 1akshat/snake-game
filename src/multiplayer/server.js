const WS = require('ws');

const server = new WS.Server({ port: 8080 });
server.on('connection', (webSocket) => {
    // keep a list of users playing snake game
    const users = [];

    webSocket.on('message', (message) => {
        const incomingUser = JSON.parse(message);

        let findIncomingUserInList = users.find(user => user.id === incomingUser.id)
        const isNewUser = findIncomingUserInList !== undefined;

        if (isNewUser) {
            users.push(incomingUser);
        } else {
            findIncomingUserInList = incomingUser;
        }

        // forward details of user back to all web sockets opened in browser
        // exaple - User 2 detail is here. it will be sent to User 1. And User 1 will update snake game accordingly
        webSocket.send(JSON.stringify(findIncomingUserInList));
    });
});