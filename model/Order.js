const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const Order = sequelize.define("Order", {
  deliveryAdress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Order;
