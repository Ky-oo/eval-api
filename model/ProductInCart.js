const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const ProductInCart = sequelize.define("ProductInCart", {
  quantity: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = ProductInCart;
