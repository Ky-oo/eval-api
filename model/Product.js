const { DataTypes } = require("sequelize");

const sequelize = require("../orm");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  popularity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Product;
