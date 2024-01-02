const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body);
  await User.create({
    name,
    email,
    password,
  });
  console.log("user signed in controller executed");
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  //check if user exists in the database
  console.log(req.body);
  const user = await User.findOne({ email, password });
  if (!user) {
    //window.alert("Invalid UserName or password, Please try again!!");
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }
  // const sessionID = uuidv4();
  // setUser(sessionID, user);
  // res.cookie(`${email}_uid`, sessionID);
  const token = setUser(user);
  res.cookie("jwt token", token);
  return res.redirect("/");
  //return res.render("home");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
