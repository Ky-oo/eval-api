var express = require("express");
var path = require("path");

const dotenv = require("dotenv");
dotenv.config();

require("./model");

var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var tagsRouter = require("./routes/tags");
var adminRouter = require("./routes/admin");

var verifyToken = require("./middleware/verify_jwt_token");
var verifyIsAdmin = require("./middleware/verify_is_admin");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);

app.use(verifyToken);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use(verifyIsAdmin);

app.use("/tags", tagsRouter);
app.use("/admin", adminRouter);

module.exports = app;
