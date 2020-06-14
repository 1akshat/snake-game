// import isNumber from 'ecmascript-is-number';
// const isNumber = require('ecmascript-is-number');
const is = require('is');

const users = [];

const addUpdateUser = (clientUserObject) => {
    if (!is.number(clientUserObject.id)) {
        return;
    }

    const indexOfIncomingUser = users.findIndex(user => user.id === clientUserObject.id);
    const isNewUser = indexOfIncomingUser < 0;


    const currentUser = {
        ...clientUserObject,
        lastActiveTime: new Date().toISOString()
    };

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
    addUpdateUser,
    getAllUsers
}
