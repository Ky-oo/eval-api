const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const Order = sequelize.define("Order", {
  deliveryAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
