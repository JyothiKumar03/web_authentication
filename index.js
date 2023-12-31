const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const { connectToMongoDB } = require("./connectDB");
const staticRoute = require("./routes/staticPageRouter");
const { restrictedLoggedInUsersOnly } = require("./middleware/auth");
require("dotenv").config({ path: "./.env" });
//const userRouter = require("./routes/user");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require("./config/urls").mongoose;
const userRouter = require("./routes/user");

connectToMongoDB(process.env.DB_CONNECT).then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT;
app.use("/againhomepage", restrictedLoggedInUsersOnly, staticRoute);
app.use("/user", userRouter);
app.use("/", staticRoute);

//reat routes

//app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log("Server Started on PORT: " + PORT);
});

//to handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  // Optionally, you might want to gracefully shut down your application here.
});
