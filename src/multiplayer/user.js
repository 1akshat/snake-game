const isNumber = require('ecmascript-is-number');

const users = [];

const addUpdateUser = (clientUserObject) => {
  if (!isNumber(clientUserObject.id)) {
    return;
  }
  const indexOfIncomingUser = users.findIndex(user => user.id === clientUserObject.id);
  const isNewUser = indexOfIncomingUser < 0;
  const currentUser = {
    ...clientUserObject,
    lastActiveTime: new Date().toISOString()
  };

  console.log(isNewUser);
  console.log(users);
  if (isNewUser) {
    users.push(currentUser);
  } else {
    users.splice(indexOfIncomingUser, 1);
    users.push(currentUser);
  }
  console.log(users);
  return currentUser;
}

const removeUser = (userId) => {
  users.filter(user => user.id !== userId);
  console.log(users);
  return
}

const getAllUsers = () => {
  // TODO: deep clone || proxy of nested objects
  return [...users];
}

module.exports = {
  addUpdateUser,
  removeUser,
  getAllUsers
}
