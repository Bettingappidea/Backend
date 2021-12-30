require("dotenv").config();
/*
loads local environment variables
dotenv is the npm library for loading environment variables
*/

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected"));
//middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require("./Routes/users");
app.use("/users", user);

const port = process.env.PORT || 4000;

app.get("/", function (req, res) {
  res.send("Main Api Landing");
});

app.listen(port, function () {
  console.log(`Starting a server at port ${port}`);
}); //starts a server at this specific port
