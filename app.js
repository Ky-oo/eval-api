var express = require("express");
var path = require("path");

const dotenv = require("dotenv");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

dotenv.config();
require("./model");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
