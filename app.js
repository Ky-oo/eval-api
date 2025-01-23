var express = require("express");
var path = require("path");

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Initialize database models
require("./model");

// Initialize routers
var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var tagsRouter = require("./routes/tags");
var adminRouter = require("./routes/admin");
var cartRouter = require("./routes/carts");
var orderRouter = require("./routes/orders");

// Initialize middlewares
var verifyToken = require("./middleware/verify_jwt_token");
var verifyIsAdmin = require("./middleware/verify_is_admin");

var app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define cron
require("./utils/cron");

// Define routes
app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Middleware to verify JWT token
app.use(verifyToken);

// Accessible only logged
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

// Middleware to verify if the user is an admin
app.use(verifyIsAdmin);

// Accessible only if admin
app.use("/tags", tagsRouter);
app.use("/admin", adminRouter);

module.exports = app;
