const { getUser } = require("../service/auth");

async function restrictedLoggedInUsersOnly(req, res, next) {
  try {
    const userUid = req.cookies?.uid;
    if (!userUid) return redirect("/login");
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in checking cookies of logged in users " + error);
  }
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictedLoggedInUsersOnly,
  checkAuth,
};
