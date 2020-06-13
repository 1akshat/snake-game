// taken randomly from https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
const randomString = () => {
    return Math.random().toString(36).slice(2);
}

const webSocket = new WebSocket("ws://localhost:8080/");
const user = { id: randomString() };
document.getElementById('userId').textContent = user.id;

webSocket.onopen = () => {
    // user is registered to back-end server
    webSocket.send(JSON.stringify(user));
    sendMouseHover(webSocket);

    webSocket.addEventListener('message', (message) => {
        // message.data will be used to recieve user objects
        const usersData = JSON.parse(message.data);

        if (Array.isArray(usersData)) {
            const filteredDataForThisPage = usersData.filter(user => userPartners.indexOf(user.id) >= 0);
            console.log(filteredDataForThisPage);
        }


        /* If message.data user matches with userPartners, then next steps of updating UI as per info recieved happens */
    });
};

const sendMouseHover = (webSocket) => {
    document.addEventListener('mouseover', (event) => {
        user.clientX = event.clientX;
        user.clientY = event.clientY;
        webSocket.send(JSON.stringify(user));
    })
}

const connect = () => {
    const input = document.getElementById('userIdToConnect');
    userPartners.push(input.value);
}

// will be used to keep track of players, with whom current user is playing multiplayer game
const userPartners = [];