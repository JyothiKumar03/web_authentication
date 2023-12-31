//this is a map , A User Map
const SessionIDUsers = new Map();

function setUser(id, user) {
  SessionIDUsers.set(id, user);
}

function getUser(id) {
  return SessionIDUsers.get(id);
}

module.exports = {
  setUser,
  getUser,
};
