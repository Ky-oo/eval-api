const { DataTypes } = require("sequelize");
const sequelize = require("../orm");

const Cart = sequelize.define("Cart", {
  tokenSession: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Cart;
