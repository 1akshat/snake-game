// import isNumber from 'ecmascript-is-number';
// const isNumber = require('ecmascript-is-number');
const is = require('is');

class User {
    constructor(id, data, lastActive) {
        this.id = id;
        this.data = data;
        this.lastActive = lastActive;
    }
}

const users = [];

const addUpdateUser = (clientUserObject) => {
    if (!is.number(clientUserObject.id)) {
        return;
    }

    const indexOfIncomingUser = users.findIndex(user => user.id === clientUserObject.id);
    const isNewUser = indexOfIncomingUser < 0;

    const currentUser = clientUserObject;

    // TODO: Convert user object into server side object, with update of lastActive time bit
    // const currentUser = new User(clientUserObject.id, clientUserObject.data, new Date());

    if (isNewUser) {
        users.push(currentUser);
    } else {
        users.splice(indexOfIncomingUser, 1);
        users.push(currentUser);
    }

    return currentUser;
}

const getAllUsers = () => {
    // TODO: deep clone || proxy of nested objects
    return [...users];
}

module.exports = {
    User,
    addUpdateUser,
    getAllUsers
}
