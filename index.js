require("dotenv").config();
/*
loads local environment variables
dotenv is the npm library for loading environment variables
*/

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected"));
//middlewere
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://gazebo-9bbd1.web.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const user = require("./Routes/users");
app.use("/users", user);

const secretKey = process.env.App_jwtPrivateKey;
if (!secretKey) {
  console.log("Fatal Error, Secret key does not exist");
  process.exit(1);
}
const port = process.env.PORT || 4000;

app.get("/", function (req, res) {
  res.send("Main Api Landing");
});

app.listen(port, function () {
  console.log(`Starting a server at port ${port}`);
}); //starts a server at this specific port
