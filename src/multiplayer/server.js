const WS = require('ws');

const server = new WS.Server({ port: 8080 });

// keep a list of users playing snake game
const users = [];

server.on('connection', (webSocket) => {
    console.log('New connection made...')
    webSocket.on('message', (message) => {
        console.log('Received: ', message);
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
        server.clients.forEach((client) => {
            if (client !== server && client.readyState === WS.OPEN) {
                client.send(JSON.stringify(users));
            }
        });
    });
});