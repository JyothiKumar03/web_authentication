const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

/*
this is a map , A User Map used for sessions
const SessionIDUsers = new Map();
functions for Sessions, Cookies
function setUser(id, user) {
  SessionIDUsers.set(id, user);
}

function getUser(id) {
  return SessionIDUsers.get(id);
}
*/
function setUser(user) {
  try {
    const payload = {
      //id: user._id,
      email: user.email,
    };
    const expires_in = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.SECRET_KEY, expires_in);
  } catch (error) {
    console.log("Error in setting the token for user : ", error);
  }
}

function getUser(token) {
  try {
    return jwt.verify(token);
  } catch (error) {
    console.log("Error in verifying the token of the user : ", error);
  }
}

module.exports = {
  setUser,
  getUser,
};
