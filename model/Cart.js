const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const Cart = sequelize.define("Cart", {});

module.exports = Cart;
