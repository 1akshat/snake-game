// taken randomly from https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
const randomString = () => {
    return Math.random().toString(36).slice(2);
}

const webSocket = new WebSocket("ws://localhost:8080/");
const user = { id: randomString() };

webSocket.onopen = () => {
    // user is registered to back-end server
    webSocket.send(JSON.stringify(user));

    webSocket.addEventListener('message', (message) => {
        // message.data will be used to recieve user objects
        console.log(message);

        /* If message.data user matches with userPartners, then next steps of updating UI as per info recieved happens */
    });
};

// will be used to keep track of players, with whom current user is playing multiplayer game
const userPartners = [];