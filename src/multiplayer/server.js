const WS = require('ws');
const { addUpdateUser, getAllUsers } = require('./user');

const server = new WS.Server({ port: 8080 });

server.on('connection', (webSocket) => {
    console.log('New connection made...')
    webSocket.on('message', (message) => {
        console.log('Received: ', message);
        const clientUser = JSON.parse(message);

        addUpdateUser(clientUser);

        // forward details of user back to all web sockets opened in browser
        // exaple - User 2 detail is here. it will be sent to User 1. And User 1 will update snake game accordingly
        server.clients.forEach((client) => {
            if (client !== server && client.readyState === WS.OPEN) {
                client.send(JSON.stringify(getAllUsers()));
            }
        });
    });
});
